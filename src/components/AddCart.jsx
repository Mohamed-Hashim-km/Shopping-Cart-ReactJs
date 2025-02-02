import React, { useContext } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Delete, Increase, Decrease, RemoveAll } from "../store/addCartSlice";
import { toast } from "react-toastify";

const AddCart = () => {
  // const { cart, dispatchCart, isOpen, totalPrice, totalQuantity } = useContext(Cartconstext);

  const cart = useSelector((state) => state.cartState.cart);
  const isOpen = useSelector((state) => state.cartState.isOpen);

  const totalPrice = cart.reduce((acc, val) => (acc += val.price * val.quantity), 0);
  const totalQuantity = cart.reduce((acc, val) => (acc += val.quantity), 0);

  const dispatchCart = useDispatch();

  return (
    <>
      {/* ============================Drawer Part=============================== */}
      <div>
        <div
          className={`fixed md:w-[80vh] w-[90%] shadow-black shadow-lg duration-700 ease-in-out bg-transparent top-[10%] md:top-14 pt-10 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } bg-white w-64 dark:bg-gray-800`}
          tabIndex="-1"
          aria-labelledby="drawer-body-scrolling-label"
        >
          {cart.map((item, index) => {
            return (
              <div className="max-w-2xl  mx-auto " key={index}>
                <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <img className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={item.images} />
                  </div>

                  <div className="flex flex-col gap-2 py-2">
                    <p className="text-xl font-bold">{item.title}</p>

                    <p className="text-gray-500">{item.warrantyInformation}</p>

                    <form className="max-w-xs ">
                      <label for="counter-input" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Choose quantity:
                      </label>
                      <div className="relative flex  items-center ">
                        <div>
                          <button
                            onClick={() => dispatchCart(Decrease({ id: item.id }))}
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                            </svg>
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter
                            className="flex-shrink-0 text-gray-900 dark:text-white border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                            placeholder=""
                            value={item.quantity}
                            required
                          />
                          <button
                            onClick={() => dispatchCart(Increase({ id: item.id }))}
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                          >
                            <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex pt-2">
                        <button
                          onClick={() => dispatchCart(Delete({ id: item.id }))}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Remove
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-center">
            <div className="shadow-black w-[70%] shadow-lg mt-3 mb-14 ">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Total Items</span>
                  <span>{totalQuantity}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${Math.round(totalPrice)}</span>
                </div>
                <button onClick={() => {dispatchCart(RemoveAll()),toast.success("Check out Success",{
                  toastId: "checkOut",
                })}} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">
                  CHECK OUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCart;
