import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Home.css";
import { motion } from "framer-motion";
import { FaShoppingCart, FaSearch, FaHeart } from "react-icons/fa";

export const Home = () => {
  const [recipe, setRecipe] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // ✅ Added useNavigate

  useEffect(() => {
    FetchData();
    loadCartFromLocalStorage();
  }, []);

  async function FetchData() {
    try {
      let res = await fetch("https://recipe-app-4kos.onrender.com/auth/Data");
      let data = await res.json();
      setRecipe(data.recipes);
      setFilteredRecipes(data.recipes);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (search) {
      const filtered = recipe.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.cuisine.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipe);
    }
  }, [search, recipe]);

  function loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }

  function addToCart(item) {
    const token = localStorage.getItem("token");
    if (token) {
      let updatedCart = [...cart, item];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
      alert("Added to Cart!");
    } else {
      alert("Please login first");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-12 px-8 md:px-20 lg:px-32">
      <div className="flex justify-center mb-10">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 text-xl" />
        </div>
      </div>
      <motion.div
        className="recipe-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((item, index) => (
            <motion.div
              key={index}
              className="recipe-card"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-32 h-32 rounded-xl overflow-hidden shadow-md">
                <img
                  src={item.image}
                  alt="Recipe"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3>{item.name}</h3>
              <p>Cuisine: {item.cuisine}</p>
              <p>Price: ₹{item.caloriesPerServing}</p>
              <p>⭐ {item.rating}</p>
              <div className="flex justify-between w-full mt-4 space-x-2">
                <button
                  className="btn btn-secondary"
                  onClick={() => addToCart(item)}
                >
                  <FaHeart className="mr-1 text-lg" /> Add to Cart
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/recipe/${item.id}`)} // ✅ Navigate to details page
                >
                  <FaShoppingCart className="mr-1 text-lg" /> Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">Loading Data...</p>
        )}
      </motion.div>
    </div>
  );
};


// import React, { useEffect, useState } from 'react';
// import '../style/Home.css';

// export const Home = () => {
//   const [recipe, setRecipe] = useState([]);
//   const [filteredRecipes, setFilteredRecipes] = useState([]);
//   const [search, setSearch] = useState('');
//   const [DetailsPage, setDetailsPage] = useState(false);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     FetchData();
//     loadCartFromLocalStorage();
//   }, []);

//   async function FetchData() {
//     try {
//       let res = await fetch("http://localhost:4000/auth/Data");
//       let data = await res.json();
//       const newData = data.recipes;
//       setRecipe(newData);
//       setFilteredRecipes(newData);
//     } catch (error) {
//       console.log("get error:", error);
//     }
//   }

//   useEffect(() => {
//     if (search) {
//       const filtered = recipe.filter((item) =>
//         item.name.toLowerCase().includes(search.toLowerCase()) ||
//         item.cuisine.toLowerCase().includes(search.toLowerCase())
//       );
//       setFilteredRecipes(filtered);
//     } else {
//       setFilteredRecipes(recipe);
//     }
//   }, [search, recipe]);

//   function viewAllDetails(card) {
//     setSelectedCard(card);
//     setDetailsPage(true);
//   }

//   function closeDisplay() {
//     setDetailsPage(false);
//   }

//   function loadCartFromLocalStorage() {
//     const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCart(storedCart);
//   }

//   function addToCart(item) {

//   const token = localStorage.getItem('token')
//   if(token){
//       let updatedCart = [...cart,  item];
//       localStorage.setItem("cart", JSON.stringify(updatedCart));
//       setCart(updatedCart);
//       alert("Added to Cart!");
//     }else{
//       alert('please login first')
//     }

//   }

//   return (
//     <div className="full_container">

//       <input
//         placeholder="Search Here..."
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         required
//         className="search_recipes"
//       />

//       <div className="container_recips">

//         {filteredRecipes.length > 0 ? (
//           filteredRecipes.map((item, index) => (
//             <div key={index} className="recipe_card">

//               <img src={item.image} alt="No image" className="recips_image" />

//               <p>Name: {item.name}</p>
//               <p>Type: {item.cuisine}</p>
//               <p>Price: {item.caloriesPerServing}</p>
//               <p>Rating: {item.rating}</p>

//               <div className='bottom_buttons'>

//                 <button className="add_to_cart" onClick={() => addToCart(item)}>❤️ Add to Cart</button>
//                 <button className="Details_recipe" onClick={() => viewAllDetails(item)}>Details</button>
//               </div>

//               {DetailsPage ? (
//                 <div className="background_usage">
//                   <div className="Detail_page">
//                     <img src={selectedCard.image} alt="No image" className="recips_image" />
//                     <div>
//                       <h3>Name: {selectedCard.name}</h3>
//                       <p><span style={{ color: "blue" }}>Ingredients:</span> {selectedCard.ingredients}</p>
//                       <p><span style={{ color: "blue" }}>Meal Type:</span> {selectedCard.mealType}</p>
//                       <p><span style={{ color: "blue", fontWeight: "bold" }}>Prep Time:</span> {selectedCard.prepTimeMinutes}</p>
//                       <p><span style={{ color: "blue" }}>Instructions:</span> {selectedCard.instructions}</p>
//                       <p>Price: {selectedCard.caloriesPerServing}</p>
//                       <div>
//                         <button className="add_to_cart" onClick={() => addToCart(selectedCard)}>❤️ Add to Cart</button>
//                         <button onClick={closeDisplay} className="close_Button">Close</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : null}
//             </div>
//           ))
//         ) : (
//           <p>Loading Data...</p>
//         )}
//       </div>
//     </div>
//   );
// };
