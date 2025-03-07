import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import { Navbar } from "./Navbar/navbar";
import { Home } from "./Component/Home";
import { RecipeDetail } from "./Component/RecipeDetail";
import { CartPage } from "./Component/CartPage";
import RecipeForm from "./Component/RecipeForm";
import RecipeList from "./Component/RecipeList";
import SurpriseMe from "./Component/SurpriseMe"; // Import SurpriseMe component

function AllComponent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/submit-recipe" element={<RecipeForm />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/surprise-me" element={<SurpriseMe />} /> {/* Add SurpriseMe route */}
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