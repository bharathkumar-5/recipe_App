import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import { Navbar } from "./Navbar/navbar";
import { Home } from "./Component/Home";
import { RecipeDetail } from "./Component/RecipeDetail"; // ✅ Import RecipeDetail
import { CartPage } from "./Component/CartPage";

function AllComponent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} /> {/* ✅ Fixed Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AllComponent />
    </BrowserRouter>
  );
}

export default App;
