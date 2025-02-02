import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./screens/HomePage";
import ProductDeatailPage from "./screens/ProductDeatailPage";
import Nav from "./components/Nav";
import Filter from "./components/DropDown";
import SearchProducts from "./components/SearchProducts";
import Footer from "./components/Footer";
import AddCart from "./components/AddCart";

function App() {
  return (
    <>
      <Nav />
      <AddCart />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ProductDeatails/:id" element={<ProductDeatailPage />} />
        <Route path="/Filter/:name" element={<Filter />} />
        <Route path="/Search/:search" element={<SearchProducts />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
