# Sociopedia

Sociopedia is a full-stack MERN social media application where users can share posts, follow friends, and interact with a community.

## 🚀 Features
- **Authentication**: JWT-based login and registration.
- **Social Networking**: Add/remove friends and view profiles.
- **Posting**: Create posts with images and descriptions.
- **Interactions**: Like posts and view comments.
- **Responsive Design**: Dark/Light mode support and mobile-responsive UI using Material UI.

## 🛠️ Tech Stack
- **Frontend**: React, Redux Toolkit, React-Router-DOM, Formik, Yup, Material UI.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Multer.

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd Sociopedia
```

### 2. Configure Environment Variables

#### Server (`/server/.env`)
Create a `.env` file in the `server` directory:
```env
PORT=3001
MONGO_URL=mongodb://localhost:27017/sociopedia
JWT_SECRET=your_jwt_secret_here
```

#### Client (`/client/.env`)
Create a `.env` file in the `client` directory:
```env
REACT_APP_BASE_URL=http://localhost:3001
```

### 3. Install Dependencies

**Server:**
```bash
cd server
npm install --legacy-peer-deps
```

**Client:**
```bash
cd client
npm install
```

### 4. Seed the Database
To populate the database with sample users (from randomuser.me) and posts (from dummyjson.com), run:
```bash
cd server
npm run seed
```
*Note: Default password for all seeded users is `password123`.*

### 5. Run the Application

**Run Server:**
```bash
cd server
npm run dev
```

**Run Client:**
```bash
cd client
npm start
```

## 📂 Project Structure
- **/client**: React frontend application.
- **/server**: Node/Express backend API.
- **/server/seed.js**: Script to populate the database with mock data.
- **/server/public/assets**: Storage for user-uploaded images and static assets.
