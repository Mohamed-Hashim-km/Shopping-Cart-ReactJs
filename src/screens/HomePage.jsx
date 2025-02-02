import React, { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { AddItem } from "../store/addCartSlice";
import { useDispatch, useSelector } from "react-redux";
import { ProductStore } from "../store/productSlice";
import { toast } from "react-toastify";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [priceFilterStatus, setPriceFilterStatus] = useState("all value");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartState.cart);
  const productDetaileStore = useSelector((state) => state.productState.product);

  // const { dispatchProduct, product } = useContext(ProductContext);
  // const { cart, dispatch } = useContext(Cartconstext);

  const Products = async () => {
    setIsLoading(true);
    const response = await fetch(`https://dummyjson.com/products`);
    const data = await response.json();
    dispatch(ProductStore({ product: data.products }));
    setIsLoading(false);
  };

  const productFullDetailes = (id) => {
    navigate(`/ProductDeatails/${id}`);
  };

  const isItemInCart = (id, currentProduct) => {
    const isItem = cart.filter((item) => item.id === id);
    if (isItem.length > 0) {
      toast.error("Already In The Cart",{
        toastId: id
      });
    } else {
      dispatch(AddItem({ product: currentProduct }));
      toast.success("Item Added To Cart",{
        toastId: id
      });
    }
  };

  const manageProduct = productDetaileStore.filter((currentProduct, index) => {
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
    Products();
  }, []);

  return (
    <>
   <div className="min-h-[100vh]">
  {isLoading ? (
    <div className="flex justify-center items-center h-[80vh]">
      <Loader />
    </div>
  ) : (
    <div>
      <div className="md:mb-4 md:mt-2">
      <select
        className="shadow-black mt-3 mb-7 shadow-sm bg-[#1d4ed8] font-extrabold font-mono text-center text-white drop-shadow-md border-[#f3f4f6] outline-none cursor-pointer px-2 py-1 rounded-md  ml-2 sm:ml-0 sm:mb-0 sm:mt-0 sm:py-2 sm:px-4"
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
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        {manageProduct.map((item, index) => {
          return (
            <Card
              key={index}
              product={item}
              title={item.title}
              images={item.images}
              price={item.price}
              rating={item.rating}
              productFullDetailes={productFullDetailes}
              id={item.id}
              isItemInCart={isItemInCart}
            />
          );
        })}
      </div>
    </div>
  )}
</div>
    </>
  );
};

export default HomePage;
