// import React, { useState, useEffect } from 'react';
// import { NavLink, Link } from 'react-router-dom';
// import '../style/navbar.css'

// export const Navbar = ({ search, setSearch }) => {
//   const [loged, setLoged] = useState(false)
//   const [email ,setemail] =useState('')
//   const [MyDart , setCart ] = useState([])



//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     const user = localStorage.getItem('email')
//     const CartData = localStorage.getItem('Cart')


//     if (CartData) {
//       try {
//         setCart(JSON.parse(CartData))
//       } catch (error) {
//         console.error('Error parsing cart data:', error)
//         setCart([]); 
//       }
//     } else {
//       setCart([]); 
//     }


//     setemail(user)
//     if (token) {
//       setLoged(true)
//     } else {
//       setLoged(false)
//     }
//   }, []);

//   console.log(email)


//   function handleLogout() {
//     localStorage.clear();

//     setLoged(false); 
//     alert('LogOut Successful');
//     window.location.reload();
//   }

//   return (
//     <>
//      <nav>

//         <img src="https://www.pngall.com/wp-content/uploads/8/Cooking-Recipe-PNG-Images.png" />
// <div>

        

//       <Link to="/" >Home</Link>
//       <Link to="/Cart">Cart {MyDart.length > 0 ? MyDart.length : 0}</Link>
            
//       <div className={loged ? 'profile' : ''}>
//        <p  className='email_user'> <ul>{email}</ul></p>
//       {loged ? (
//         <>
//           <Link to="/" onClick={handleLogout} className='Login'>
//             Log Out
//           </Link>
//         </>
//       ) : (
//         <Link to="/login" className='Login'>Login</Link>
//       )}
// </div>
// </div>
     
//       </nav>
//     </>
//   );
// };




//nav bar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut, FiLogIn, FiList, FiZap } from "react-icons/fi";
import '../style/navbar.css';

export const Navbar = ({ search, setSearch }) => {
  const [loged, setLoged] = useState(false);
  const [email, setEmail] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    loadCartData();
    window.addEventListener("storage", loadCartData);

    return () => {
      window.removeEventListener("storage", loadCartData);
    };
  }, []);

  function loadCartData() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('email');
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    setEmail(user);
    setCartCount(cartData.length);
    setLoged(!!token);
  }

  function handleLogout() {
    localStorage.clear();
    setLoged(false);
    setCartCount(0);
    alert('LogOut Successful');
    window.location.reload();
  }

  // Function to handle "Surprise Me" button click
  function handleSurpriseMe() {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.recipes.length);
        const randomRecipe = data.recipes[randomIndex];
        navigate(`/recipe/${randomRecipe.id}`); // Navigate to the random recipe's details page
      })
      .catch((error) => {
        console.error("Error fetching random recipe:", error);
        alert("Failed to fetch a random recipe. Please try again.");
      });
  }

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="nav-logo">
        <img src="https://www.mothersrecipe.com/cdn/shop/files/Recipe_Logo_Back_-01-removebg-preview.png?v=1686986104" alt="Logo" />
        <span>Foodie</span>
      </Link>

      {/* Links */}
      <div className="nav-links">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/recipes" className="nav-item">
          <FiList size={18} /> Recipe List
        </NavLink>
        <NavLink to="/submit-recipe" className="nav-item">Submit Recipe</NavLink>

        {/* Surprise Me Button */}
        <button onClick={handleSurpriseMe} className="nav-item surprise-me-btn">
          <FiZap size={18} /> Surprise Me
        </button>

        {/* Cart Link */}
        <NavLink to="/Cart" className="nav-item">
          <FiShoppingCart size={22} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>

        {/* Profile Section */}
        <div className="nav-profile">
          {loged ? (
            <div className="profile-container">
              <button className="profile-btn" onClick={() => setShowDropdown(!showDropdown)}>
                <FiUser size={22} />
                <span>{email}</span>
              </button>
              {showDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}><FiLogOut size={18} /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <NavLink to="/login" className="login-btn">
              <FiLogIn size={20} /> Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};