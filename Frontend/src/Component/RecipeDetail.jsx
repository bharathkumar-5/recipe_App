import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        let res = await fetch("https://recipe-app-4kos.onrender.com/auth/Data");
        let data = await res.json();
        const selectedRecipe = data.recipes.find((item) => item.id === parseInt(id));

        if (selectedRecipe) {
          setRecipe(selectedRecipe);
        } else {
          console.error("Recipe not found!");
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-white text-2xl">Loading...</div>;
  }

  if (!recipe) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-2xl">Recipe not found!</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 p-6">
      <motion.div
        className="w-full max-w-2xl bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 text-center border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Recipe Name */}
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">{recipe.name}</h1>
        <p className="text-lg text-gray-300 mt-2">A delicious delight! 🍽️</p>

        {/* Image */}
        <div className="w-full h-64 bg-cover bg-center rounded-2xl shadow-lg mt-6 mx-auto" 
             style={{ backgroundImage: `url(${recipe.image})` }}>
        </div>

        {/* Ingredients & Instructions */}
        <div className="mt-8 flex flex-col items-center space-y-6">
          {/* Ingredients */}
          <motion.div
            className="bg-white/10 p-6 rounded-xl shadow-md text-center border border-gray-400/20 w-full"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-yellow-300 mb-3">🛒 Ingredients</h2>
            <ul className="list-disc text-lg text-gray-200 space-y-2">
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index} className="text-center">{ingredient}</li>
              ))}
            </ul>
          </motion.div>

          {/* Instructions */}
          <motion.div
            className="bg-white/10 p-6 rounded-xl shadow-md text-center border border-gray-400/20 w-full"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-green-300 mb-3">📜 Instructions</h2>
            <ol className="list-decimal text-lg text-gray-200 space-y-2">
              {recipe.instructions?.map((step, index) => (
                <li key={index} className="text-center">{step}</li>
              ))}
            </ol>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
