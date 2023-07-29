import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, post: description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
