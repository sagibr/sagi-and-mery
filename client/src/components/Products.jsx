import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/item/items")
      .then((res) => res.data && setProducts(res.data));
  }, []);
  return (
    <div className="w-full text-center">
      <h1 className="text-5xl text-blue-500 mt-10">Browse Products</h1>
      <Modal />
      <div className="flex w-screen flex-wrap">
        {products.map((product, index) => {
          return (
            <div key={index} className="w-36 m-10">
              <h1 className="text-3xl">{product.name}</h1>
              <img src={product.images} alt="" className="mt-8" />
              <Link to="/product" state={{ id: product._id }}>
                <button className="bg-black hover:text-red-700 mt-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  More info
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
