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
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 z-[999] sticky top-0">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex px-4 py-2 rounded-md border-2 border-black w-[90vh]  overflow-hidden max-w-md  font-[sans-serif]">
            <input onChange={SearchHandler} placeholder="Search Products..." className="w-full outline-none bg-transparent text-wt text-sm" ref={searchValues} />
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-white text-white">
                <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
              </svg>
            </button>
          </div>

          <div className="hidden w-full md:block md:w-auto" id="navbar-multi-level ">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li className="relative group">
                <button className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                  Filter
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
                <div className="absolute left-0 hidden w-44 bg-white divide-y divide-gray-100 rounded-lg shadow group-hover:block dark:bg-gray-700">
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <Link to={"/"}>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          All
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a href="#" onClick={() => DropDownHandler("beauty")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Beauty
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => DropDownHandler("fragrances")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Fragrances
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => DropDownHandler("furniture")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Furniture
                      </a>
                    </li>
                    <li>
                      <a href="#" onClick={() => DropDownHandler("smartphones")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Smartphones
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              {/* <Link to={"/Cart"}> */}
              <li onClick={() => dispatch(TOggleDrawer())}>
                <span className="flex">
                  <CiShoppingCart className="block py-2 px-3 text-3xl cursor-pointer bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" />
                  <span className="text-red-700">{cart.length}</span>
                </span>
              </li>
              {/* </Link> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
