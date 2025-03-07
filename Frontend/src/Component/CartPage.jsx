// cart page file

import React, { useState, useEffect } from 'react';
import '../style/Cart.css';

export const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Track cart count

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage on cart change
    setCartCount(cart.length); // Update cart count dynamically
  }, [cart]);

  function loadCartFromLocalStorage() {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    setCartCount(storedCart.length); // Initialize count
  }

  function removeFromCart(index) {
    let updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  }

  return (
    <div>
      <h2>Your Cart ({cartCount})</h2> {/* Display cart count */}
      <div className='Cart_Page_Container'>
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <div key={index} className='cart-item'>
              <img  src={item.image} alt="No image" />

              <p style={{ borderRight: "2px solid gray", padding: "10px", marginRight: "10px" }}>
                <strong>Name:</strong><br /> {item.name}
              </p>
              <p style={{ borderRight: "2px solid gray", padding: "10px", marginRight: "10px" }}>
                <strong>Type:</strong><br />{item.cuisine}
              </p>
              <p style={{ borderRight: "2px solid gray", padding: "10px", marginRight: "10px" }}>
                <strong>Price:</strong><br />{item.caloriesPerServing}
              </p>
              <p style={{ borderRight: "2px solid gray", padding: "10px", marginRight: "10px" }}>
                <strong>Rating:</strong><br />{item.rating}
              </p>
              <button onClick={() => removeFromCart(index)} className='remove-button'>✖️ Remove</button>
            </div>
          ))
        ) : (
          <p className='empty-cart-message'>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};
