const express = require("express");
const recipe = require("../model/recipe.model");
const recipeRoute = express.Router();

// Create a new recipe
recipeRoute.post("/recipes", async (req, res) => {
  try {
    const recipeData = req.body;
    const newRecipe = await recipe.create(recipeData);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Error creating recipe:", error);
    res.status(500).json({ message: "Failed to create recipe" });
  }
});

// Get all recipes
recipeRoute.get("/recipes", async (req, res) => {
  try {
    const recipes = await recipe.find();

    console.log(recipes)
    res.status(200).json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error.message);
    res.status(500).json({ message: "Failed to fetch recipes" });
  }
});

// Get a single recipe by ID
recipeRoute.get("/recipes/:id", async (req, res) => {
  try {
    const recipe = await recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ message: "Failed to fetch recipe" });
  }
});

// Update a recipe by ID
recipeRoute.put("/recipes/:id", async (req, res) => {
  try {
    const updatedRecipe = await recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error("Error updating recipe:", error);
    res.status(500).json({ message: "Failed to update recipe" });
  }
});

// Delete a recipe by ID
recipeRoute.delete("/recipes/:id", async (req, res) => {
  try {
    const deletedRecipe = await recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    res.status(500).json({ message: "Failed to delete recipe" });
  }
});

module.exports = recipeRoute;