import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./RecipeList.css";


const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name"); // Default sorting by name
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://recipe-app-4kos.onrender.com/auth/Data")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Sort recipes whenever sortBy changes
    const sortedRecipes = [...recipes].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price") {
        return a.caloriesPerServing - b.caloriesPerServing;
      } else if (sortBy === "rating") {
        return b.rating - a.rating; // Sort by rating (descending)
      } else if (sortBy === "cuisine") {
        return a.cuisine.localeCompare(b.cuisine);
      }
      return 0;
    });
    setRecipes(sortedRecipes);
  }, [sortBy]);

  if (loading) {
    return <div className="loading">Loading recipes...</div>;
  }

  return (
    <div className="recipe-list-container">
      <h2>Recipe List</h2>
      <div className="sort-container">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
          <option value="cuisine">Sort by Cuisine</option>
        </select>
      </div>
      <motion.div
        className="recipe-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            className="recipe-card"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/recipe/${recipe.id}`)}
          >
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h3>{recipe.name}</h3>
            <p>Cuisine: {recipe.cuisine}</p>
            <p>Price: ₹{recipe.caloriesPerServing}</p>
            <p>Rating: ⭐{recipe.rating}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default RecipeList;