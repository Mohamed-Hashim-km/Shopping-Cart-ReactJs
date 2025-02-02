import React, { useContext, useRef, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { TOggleDrawer } from "../store/addCartSlice";
import { useDispatch, useSelector } from "react-redux";

const Nav = () => {
  const searchValues = useRef();

  const navigate = useNavigate();
  //   const { cart, toggleDrawer } = useContext(Cartconstext);
  const cart = useSelector((state) => state.cartState.cart);
  const dispatch = useDispatch();

  const DropDownHandler = (value) => {
    navigate(`/Filter/${value}`);
  };

  const SearchHandler = () => {
    navigate(`/Search/${searchValues.current.value}`);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-50 shadow-md sticky top-0">
      <div className="max-w-screen-xl flex justify-center md:flex md:flex-wrap items-center md:justify-between mx-auto p-4">
        <Link to="/">
          <h1 className="md:text-3xl flex  text-xl font-bold text-rose-900"><span className="md:hidden text-2xl block me-3">Store</span> <span className="hidden md:block">Shopping Cart</span></h1>
        </Link>
        
        <div className="flex items-center border border-black rounded-lg overflow-hidden max-w-md w-[90vh]">
          <input
            onChange={SearchHandler}
            placeholder="Search Products..."
            className="w-full px-3 py-2 outline-none bg-transparent text-black text-sm"
            ref={searchValues}
          />
          
        </div>
        
        <div className="hidden md:block">
          <ul className="flex space-x-8 text-gray-900 dark:text-white">
            <li className="relative group">
              <button className="flex items-center space-x-2 py-2 px-3 hover:text-blue-700 dark:hover:text-blue-500">
                <span>Filter</span>
                <svg className="w-2.5 h-2.5" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l4 4 4-4" />
                </svg>
              </button>
              <div className="absolute left-0 hidden w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-md group-hover:block dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link to="/" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">All</Link>
                  </li>
                  <li>
                    <button onClick={() => DropDownHandler("beauty")} className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600">Beauty</button>
                  </li>
                  <li>
                    <button onClick={() => DropDownHandler("fragrances")} className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600">Fragrances</button>
                  </li>
                  <li>
                    <button onClick={() => DropDownHandler("furniture")} className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600">Furniture</button>
                  </li>
                  <li>
                    <button onClick={() => DropDownHandler("smartphones")} className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600">Smartphones</button>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        
        <ul className="md:flex justify-center items-center space-x-8">
          <li onClick={() => dispatch(TOggleDrawer())} className="cursor-pointer flex items-center">
            <CiShoppingCart className="text-3xl md:text-4xl" />
            <span className="text-red-700 font-bold ml-1">{cart.length>0&&cart.length}</span>
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Nav;
