import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-stars";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../store/addCartSlice";

const SearchProducts = () => {
//   const { cart, dispatchCart } = useContext(Cartconstext);
  const [priceFilterStatus, setPriceFilterStatus] = useState("all value");

  
   const dispatch=useDispatch()
  const cart=useSelector(state=>state.cartState.cart)

  const { search } = useParams();
  const navigate = useNavigate();
  const [searchedProducts, setsearchedProducts] = useState([]);

  const ProductSearchHandler = async (search) => {
    const response = await fetch(`https://dummyjson.com/products/search?q=${search}`);
    const data = await response.json();
    setsearchedProducts(data.products);
    console.log(searchedProducts);
  };

  

  const productFullDetailes = (id) => {
    navigate(`/ProductDeatails/${id}`);
  };

  const isItemInCart = (id, currentProduct) => {
    const isItem = cart.filter((item) => item.id === id);
    if (isItem.length > 0) {
      alert("Already There");
    } else {
        dispatch(AddItem({product:currentProduct}));
    }
  };

  const manageProduct = searchedProducts.filter((currentProduct, index) => {
    if (priceFilterStatus == "all value") {
      return currentProduct;
    }
    if (priceFilterStatus == "below100") {
      return currentProduct.price < 100;
    }
    if (priceFilterStatus == "above100") {
      return currentProduct.price > 100;
    }
    if (priceFilterStatus == "above1000") {
      return currentProduct.price > 1000;
    }
  });

  useEffect(() => {
    ProductSearchHandler(search);
  }, [search]);
  return (
    <>
      <select
        className=" shadow-black shadow-sm bg-[#1d4ed8] font-extrabold font-mono text-center text-white drop-shadow-md border-[#f3f4f6] outline-none cursor-pointer px-2 py-1  rounded-md mb-3 ml-2  "
        onChange={(event) => setPriceFilterStatus(event.target.value)}
      >
        <option className="bg-white text-black" value="all value">
          All Products
        </option>
        <option className="bg-white text-black" value="below100">
          Below $100
        </option>
        <option className="bg-white text-black" value="above100">
          Above $100
        </option>
        <option className="bg-white text-black" value="above1000">
          Above $1000
        </option>
      </select>
      <div className="flex flex-wrap gap-4 justify-center">
        {manageProduct.map((item, index) => {
          return (
            <div className="w-[20%]   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
              <a >
                <img className="currentProduct-8 rounded-t-lg h-[30vh]" src={item.images[0]} onClick={() => productFullDetailes(item.id)} />
              </a>
              <div className="px-5 pb-5">
                <a >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">{item.title}</h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    <ReactStars value={item.rating} />
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">{item.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                  <a
                    onClick={() =>isItemInCart(item.id,item)}
                    
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SearchProducts;
