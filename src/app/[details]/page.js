"use client"; // Add this to ensure the component is client-side

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { toast } from "react-toastify";

// Function to fetch product data
async function fetchProduct(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null; // Handle the error case
  }
}

// Function to render stars based on rating
function renderStars(rating, maxRating = 5) {
  rating = Math.max(0, Math.min(rating, maxRating));
  const fullStars = "★".repeat(Math.floor(rating));
  const emptyStars = "☆".repeat(maxRating - Math.floor(rating));
  return fullStars + emptyStars;
}

function addToCart(product, setCart) {
  // Get the current cart from local storage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the product is already in the cart
  const productIndex = cart.findIndex((item) => item.id === product.id);

  if (productIndex > -1) {
    // If the product is already in the cart, update its quantity
    cart[productIndex].quantity += 1;
  } else {
    // If the product is not in the cart, add it
    cart.push({ ...product, quantity: 1 });
  }

  // Save the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart));
  setCart(cart); // Update state
  toast.success(`${product.title} added to cart!`);
}

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

// Client-side ProductDetails component
export default function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);

  const [cart, setCart] = useState([]);

  // Load cart from local storage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  useEffect(() => {
    // Fetch product data when the component mounts
    const getProduct = async () => {
      const productData = await fetchProduct(params.details);
      setProduct(productData);
    };
    getProduct();
  }, [params.details]);

  if (!product)
    return (
      <div className="text-5xl h-screen w-screen font-extrabold flex justify-center items-center animate-bounce">
        Loading...
      </div>
    );

  return (
    <div>
      <Header />
      <div className="p-10 mb-5 flex flex-col md:flex-row justify-center items-center">
        <div className="flex justify-center items-center">
          <img
            className="w-auto h-auto"
            src={product.images[0]}
            alt={product.title}
          />
        </div>
        <div className="flex flex-col space-y-5 justify-center items-center">
          <h1 className="text-3xl text-center font-bold">{product.title}</h1>
          <h1 className="text-2xl">${product.price}</h1>
          <h1 className="text-2xl">{renderStars(product.rating)}</h1>
          <p className="text-center">{product.description}</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        {cart.some((obj) => obj.id === product.id) ? (
          <button
            onClick={() => removeFromCart(product, setCart)}
            className="text-white w-2/4 md:w-1/4 outline outline-1 outline-black bg-black hover:text-black hover:bg-white p-5"
          >
            Remove from cart
          </button>
        ) : (
          <button
            onClick={() => addToCart(product, setCart)}
            className="text-white w-2/4 md:w-1/4 outline outline-1 outline-black bg-black hover:text-black hover:bg-white p-5"
          >
            Add to cart
          </button>
        )}
      </div>
      <div className="mt-32 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl">Reviews</h1>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review) => (
            <div
              key={review.reviewerEmail} // Assuming reviewerEmail is unique
              className="my-5 space-y-3 outline outline-2 p-5 outline-black w-2/4 md:w-1/4"
            >
              <p>{review.comment}</p>
              <p className="font-semibold">{review.reviewerName}</p>
              <p>{renderStars(review.rating)}</p>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
}
