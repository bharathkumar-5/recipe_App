const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/auth.model");
const authRoute = express.Router();

const JWT_SECRET = "Recipe_secret_key";

async function FetchData(url) {
  try {
    let res = await fetch(url);
    let data = res.json();
    return data;
  } catch (error) {
    console.log("get error:", error);
  }
}

authRoute.get("/auth/Data/:id", (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);
  if (recipe) {
    res.json(recipe);
  } else {
    res.status(404).json({ message: "Recipe not found" });
  }
});

authRoute.get("/Data", async (req, res) => {
  try {
    const recipe_data = "https://dummyjson.com/recipes?limit=48";
    const data = await FetchData(recipe_data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went wrong" });
  }
});

authRoute.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something Went wrong" });
  }
});

authRoute.post("/register", async (req, res) => {
  try {
   const {username, email, password} = req.body;

   const hashPass = await bcrypt.hash(password,10);

   const user = await User.create({
    username,
    email,
    password:hashPass
   });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register" });
  }
});

authRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = authRoute;
