const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// User model
const User = mongoose.model('User', {
  username: String,
  password: String,
});

// Webtoon model
const Webtoon = mongoose.model('Webtoon', {
  id: Number,
  title: String,
  thumbnail: String,
  image: String,
  brief_description: String,
  description: String,
});

// Favorite model
const Favorite = mongoose.model('Favorite', {
  userId: mongoose.Schema.Types.ObjectId,
  webtoonId: Number,
});

// Comment model
const Comment = mongoose.model('Comment', {
  webtoonId: Number,
  userId: mongoose.Schema.Types.ObjectId,
  content: String,
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(403).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    req.userId = decoded.id;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 8);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).json