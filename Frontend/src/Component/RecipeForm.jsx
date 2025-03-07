import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RecipeForm.css"; // Add CSS for styling

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    prepTimeMinutes: "",
    cookTimeMinutes: "",
    servings: "",
    difficulty: "",
    cuisine: "",
    caloriesPerServing: "",
    tags: "",
    image: "",
    rating: "",
    reviewCount: "",
    mealType: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-app-4kos.onrender.com/auth/recipes",
        recipe,
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.success) {
        alert("Recipe submitted successfully!");
        navigate("/");
      } else {
        setError("Failed to submit recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting recipe:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="recipe-form-container">
      <h2>Submit a New Recipe</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="recipe-form">
        <label>Recipe Name</label>
        <input type="text" name="name" onChange={handleChange} required />

        <label>Ingredients (comma separated)</label>
        <textarea name="ingredients" onChange={handleChange} required />

        <label>Instructions (comma separated)</label>
        <textarea name="instructions" onChange={handleChange} required />

        <label>Prep Time (minutes)</label>
        <input type="number" name="prepTimeMinutes" onChange={handleChange} required />

        <label>Cook Time (minutes)</label>
        <input type="number" name="cookTimeMinutes" onChange={handleChange} required />

        <label>Servings</label>
        <input type="number" name="servings" onChange={handleChange} required />

        <label>Difficulty</label>
        <input type="text" name="difficulty" onChange={handleChange} required />

        <label>Cuisine</label>
        <input type="text" name="cuisine" onChange={handleChange} required />

        <label>Calories per Serving</label>
        <input type="number" name="caloriesPerServing" onChange={handleChange} required />

        <label>Tags (comma separated)</label>
        <input type="text" name="tags" onChange={handleChange} required />

        <label>Image URL</label>
        <input type="url" name="image" onChange={handleChange} required />

        <label>Rating</label>
        <input type="number" name="rating" step="0.1" onChange={handleChange} required />

        <label>Review Count</label>
        <input type="number" name="reviewCount" onChange={handleChange} required />

        <label>Meal Type (comma separated)</label>
        <input type="text" name="mealType" onChange={handleChange} required />

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;