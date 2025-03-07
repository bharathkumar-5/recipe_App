import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SurpriseMe.css"; // Add CSS for styling


const SurpriseMe = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  const fetchRandomRecipe = async () => {
    try {
      console.log("Fetching recipes from API...");
      const response = await fetch("");
      console.log("Response status:", response.status); // Log the response status

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data.recipes); // Log the API response

      // Check if recipes exist in the response
      if (!data.recipes || data.recipes.length === 0) {
        throw new Error("No recipes found in the response.");
      }

      // Select a random recipe from the list
      const randomIndex = Math.floor(Math.random() * data.recipes.length);
      const randomRecipe = data.recipes[randomIndex];
      console.log("Random Recipe:", randomRecipe); // Log the random recipe

      // Set the random recipe in the state
      setRandomRecipe(randomRecipe);
    } catch (error) {
      console.error("Error fetching random recipe:", error);

      // Fallback data if the API fails
      const fallbackRecipes = [
        {
          id: 1,
          name: "Classic Margherita Pizza",
          ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil leaves", "Olive oil"],
          instructions: "1. Preheat oven to 475°F (245°C). 2. Roll out the pizza dough...",
          prepTimeMinutes: 20,
          cookTimeMinutes: 15,
          servings: 4,
          difficulty: "Easy",
          cuisine: "Italian",
          caloriesPerServing: 800,
          tags: ["Pizza", "Italian", "Vegetarian"],
          image: "https://example.com/margherita-pizza.jpg",
          rating: 4.7,
          reviewCount: 120,
          mealType: ["Dinner"]
        },
        {
          id: 2,
          name: "Spicy Chicken Tacos",
          ingredients: ["Chicken breast", "Taco shells", "Lettuce", "Tomatoes", "Cheese", "Spices"],
          instructions: "1. Cook the chicken breast with spices...",
          prepTimeMinutes: 15,
          cookTimeMinutes: 10,
          servings: 3,
          difficulty: "Medium",
          cuisine: "Mexican",
          caloriesPerServing: 450,
          tags: ["Tacos", "Mexican", "Spicy"],
          image: "https://example.com/chicken-tacos.jpg",
          rating: 4.5,
          reviewCount: 95,
          mealType: ["Lunch", "Dinner"]
        }
      ];

      // Select a random recipe from the fallback data
      const randomIndex = Math.floor(Math.random() * fallbackRecipes.length);
      const randomRecipe = fallbackRecipes[randomIndex];
      console.log("Random Recipe (Fallback):", randomRecipe); // Log the random recipe

      // Set the random recipe in the state
      setRandomRecipe(randomRecipe);
    }
  };

  return (
    <div className="surprise-me-container">
      <button onClick={fetchRandomRecipe} className="surprise-me-button">
        Surprise Me!
      </button>
      {randomRecipe && (
        <div className="random-recipe-details">
          <h3>{randomRecipe.name}</h3>
          <img src={randomRecipe.image} alt={randomRecipe.name} width="200" />
          <p><strong>Cuisine:</strong> {randomRecipe.cuisine}</p>
          <p><strong>Difficulty:</strong> {randomRecipe.difficulty}</p>
          <p><strong>Prep Time:</strong> {randomRecipe.prepTimeMinutes} mins</p>
          <p><strong>Cook Time:</strong> {randomRecipe.cookTimeMinutes} mins</p>
          <button onClick={() => navigate(`/recipe/${randomRecipe.id}`)}>
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default SurpriseMe;