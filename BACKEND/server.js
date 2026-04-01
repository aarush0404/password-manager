import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import cors from "cors";
import Password from "./models/Password.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err));

// route

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Check proper format "Bearer token"
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    // 3. Extract token
    const token = authHeader.split(" ")[1];

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user to request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

const existingUser = await User.findOne({ email });

if (existingUser) {
  return res.status(400).json({ message: "User already exists" });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
  token,
  user: {
    id: user._id,
    email: user.email,
    username: user.username
  }
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "You are logged in",
    user: req.user
  });
});

//password
app.post("/passwords", verifyToken, async (req, res) => {
  try {
    const { site, username, password } = req.body;

    const newPassword = new Password({
      site,
      username,
      password, // ✅ plain text (for now)
      userId: req.user.userId
    });

    await newPassword.save();

    // ✅ send full object back
    res.status(201).json(newPassword);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//get pass
app.get("/passwords", verifyToken, async (req, res) => {
  try {
    const passwords = await Password.find({
      userId: req.user.userId
    });

    res.json(passwords);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//delete password
app.delete("/passwords/:id", verifyToken, async (req, res) => {
  try {
    await Password.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId
    });

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//updata pass
app.put("/passwords/:id", verifyToken, async (req, res) => {
  try {
    const { site, username, password } = req.body;

    if (!site || !username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedPassword = await Password.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.userId
      },
      {
        site,
        username,
        password // ✅ plain text
      },
      { new: true }
    );

    if (!updatedPassword) {
      return res.status(404).json({ message: "Password not found" });
    }

    res.json(updatedPassword);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});