"use client";
import React, { useState, useEffect } from "react";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [consumerPrice, setConsumerPrice] = useState("");
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = () => {
    if (!productName || !wholesalePrice || !consumerPrice) {
      alert("Please fill all fields!");
      return;
    }

    const newProduct = {
      id: Date.now(), 
      name: productName,
      wholesalePrice: parseFloat(wholesalePrice),
      consumerPrice: parseFloat(consumerPrice),
      dateAdded: new Date().toLocaleString(), 
    };

    setProducts([...products, newProduct]);
    setProductName("");
    setWholesalePrice("");
    setConsumerPrice("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Add Product
      </h1>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Wholesale Price
          </label>
          <input
            type="number"
            value={wholesalePrice}
            onChange={(e) => setWholesalePrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter wholesale price"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Consumer Price
          </label>
          <input
            type="number"
            value={consumerPrice}
            onChange={(e) => setConsumerPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter consumer price"
          />
        </div>
      </div>

      <button
        onClick={addProduct}
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add Product
      </button>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Products</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li
              key={product.id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p className="text-gray-700 font-semibold">{product.name}</p>
                <p className="text-gray-500 text-sm">
                  Wholesale: ${product.wholesalePrice.toFixed(2)} | Consumer: $
                  {product.consumerPrice.toFixed(2)}
                </p>
                <p className="text-gray-400 text-xs">
                  Added on: {product.dateAdded}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Product;
