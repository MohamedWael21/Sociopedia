import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log("Cleared existing data.");

    const passwordHash = await bcrypt.hash("password123", 10);

    // 1. Seed Users from randomuser.me
    console.log("Fetching users...");
    const userResponses = await Promise.all([
      fetch("https://randomuser.me/api/?results=5&gender=female"),
      fetch("https://randomuser.me/api/?results=5&gender=male"),
    ]);
    const userData = await Promise.all(userResponses.map((res) => res.json()));
    const allUsers = [...userData[0].results, ...userData[1].results];

    const usersToInsert = allUsers.map((u) => ({
      firstName: u.name.first,
      lastName: u.name.last,
      email: u.email,
      password: passwordHash,
      picturePath: u.picture.large,
      friends: [],
      location: `${u.location.city}, ${u.location.country}`,
      occupation: "Social Media Enthusiast",
      viewProfile: Math.floor(Math.random() * 1000),
      impressions: Math.floor(Math.random() * 1000),
    }));

    const createdUsers = await User.insertMany(usersToInsert);
    console.log(`Inserted ${createdUsers.length} users.`);

    // 2. Seed Posts from dummyjson.com
    console.log("Fetching posts...");
    const postResponse = await fetch("https://dummyjson.com/posts?limit=20");
    const postData = await postResponse.json();

    const postsToInsert = postData.posts.map((p, index) => {
      // Rotate through users
      const user = createdUsers[index % createdUsers.length];
      return {
        userId: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description: p.body,
        picturePath: `https://picsum.photos/seed/${p.id}/800/600`, // Random post image
        userPicturePath: user.picturePath,
        likes: new Map(),
        comments: [],
      };
    });

    await Post.insertMany(postsToInsert);
    console.log(`Inserted ${postsToInsert.length} posts.`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
