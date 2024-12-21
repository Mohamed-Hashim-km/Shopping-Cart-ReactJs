import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-stars";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../store/addCartSlice";


const ProductDeatailPage = () => {
  const [isLoading,setIsLoading]=useState(true)
  const [product, setProduct] = useState([]);
//   const { cart, dispatchCart } = useContext(Cartconstext);
const dispatch=useDispatch()
const cart=useSelector(state=>state.cartState.cart)

  const { id } = useParams();

  const Products = async (id) => {
    setIsLoading(true)
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    setProduct(data);
    setIsLoading(false)
  };
  
 

  const isItemInCart = (id, currentProduct) => {
    const isItem = cart.filter((item) => item.id === id);
    if (isItem.length > 0) {
      alert("Already There");
    } else {
        dispatch(AddItem({product: currentProduct }));
    }
  };



  useEffect(() => {
    Products(id);
  }, [id]);
  
  return (
    <>
    <div className="min-h-[100vh]">
      {isLoading?<div className="flex justify-center items-center h-[80vh]"><Loader/></div>
      :<div className="flex justify-center w-full  mt-[5%]">
        <a
          href="#"
          className="flex flex-col items-center  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-[100%] hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 p-5"
        >
          <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={product.images} alt="" />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
            <h1 className="font-extrabold">{product.category}</h1>
            <h3 className="mb-3 font-bold text-gray-700 dark:text-gray-400">{product.description}</h3>
            <ReactStars value={product.rating} />
            <h1 className="font-bold">Stock={product.stock}</h1>
            <h1 className="font-bold">Warranty={product.warrantyInformation}</h1>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              $<span className="text-black">{product.price}</span>
            </span>
            <div className="flex justify-end">
              <a
                onClick={() => isItemInCart(product.id, product)}
                href="#"
                className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </a>
            </div>
          </div>
        </a>
      </div>

}  </div>  </>
  );
};

export default ProductDeatailPage;
