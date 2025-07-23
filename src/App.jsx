import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favourites from "./pages/Favourites";
import Recipes from "./pages/recipes";
import Search from "./pages/search";
import Layout from "./layout/layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="favourites" element={<Favourites />} />
        <Route path="recipes/:id" element={<Recipes />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
