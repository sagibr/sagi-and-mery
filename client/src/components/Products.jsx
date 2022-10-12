import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import axios from "../api/axios"
import Modal from "./Modal"

function Products() {
  const [products, setProducts] = useState([])
  const PRODUCT_URL = "/item/items"
  const auth = useSelector((state) => state.user.user)

  const config = {
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  }

  const getData = () => {
    axios
      .get(PRODUCT_URL, config)
      .then((res) => res.data && setProducts(res.data))
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="w-full text-center">
      <h1 className="text-5xl text-blue-500 mt-10">Browse Products</h1>
      <Modal getData={getData} />
      <div className="flex w-screen flex-wrap">
        {products.map((product, index) => {
          return (
            <div key={index} className="w-56 m-10">
              <h1 className="text-3xl">{product.name}</h1>
              <img src={product.images} alt="" className="mt-8" />
              <Link to="/product" state={{ id: product._id }}>
                <button className="bg-black hover:text-red-700 mt-10 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  More info
                </button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
