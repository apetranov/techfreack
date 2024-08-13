"use client"; // Ensure the component is client-side

import { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import Header from "@/components/Header";

// Function to remove an item from the cart
function removeFromCart(product, setCart) {
  // Retrieve current cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Filter out the item to be removed
  const updatedCart = cart.filter((item) => item.id !== product.id);

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(updatedCart));

  // Update state to reflect the changes
  setCart(updatedCart);
  toast.success(`${product.title} removed from cart!`);
}

// Cart page component
export default function CartPage() {
  const [cart, setCart] = useState([]);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="p-10 text-center">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <Link href="/" className="text-blue-500">
            Go back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="p-10 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-center">Shopping Cart</h1>
        {cart.length > 0 ? (
          <button
            onClick={() => {
              localStorage.setItem("cart", JSON.stringify([]));
              setCart([]);
              toast.success("Cart has been emptied!");
            }}
            className="mt-5 text-white w-2/4 md:w-1/4 outline outline-1 outline-black bg-black hover:text-black hover:bg-white p-5"
          >
            Empty cart
          </button>
        ) : null}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-5 border border-gray-300 rounded-lg flex flex-col items-center"
            >
              <img
                className="w-40 h-40 object-cover"
                src={item.images[0]}
                alt={item.title}
              />
              <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
              <p className="text-lg mt-1">${item.price}</p>
              <p className="text-lg mt-1">Quantity: {item.quantity}</p>
              <button
                onClick={() => removeFromCart(item, setCart)}
                className="mt-4 text-white bg-red-500 hover:bg-red-700 py-2 px-4 rounded"
              >
                Remove from Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
