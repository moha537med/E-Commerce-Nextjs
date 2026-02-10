"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { addCartItem } from "@/features/cartSlice";
import { addWishlistItem, removeWishlistItem } from "@/features/wishlistSlice";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    price: number;
    imageCover?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { token } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [message, setMessage] = useState("");
  const [isAddingCart, setIsAddingCart] = useState(false);

  const isInCart = cartItems.some((item) => item.product?._id === product._id);
  const isInWishlist = wishlistItems.some((item) => item._id === product._id);

  const goToDetails = () => {
    router.push(`/products/${product._id}`);
  };


  const handleAddToCart = async () => {
    if (!token) return router.push("/login");
    if (isInCart || isAddingCart) return;

    setIsAddingCart(true);
    try {
      await dispatch(addCartItem(product._id)).unwrap();
      setMessage("Added to cart");
    } catch {
      setMessage("Error occurred");
    } finally {
      setIsAddingCart(false);
      setTimeout(() => setMessage(""), 2500);
    }
  };

  const handleWishlistToggle = () => {
    if (!token) return router.push("/login");

    if (isInWishlist) {
      dispatch(removeWishlistItem(product._id));
    } else {
      dispatch(addWishlistItem(product._id));
    }
  };

  return (
    <div onClick={goToDetails} className="border rounded-xl p-3 sm:p-4 shadow hover:shadow-lg transition-shadow flex flex-col gap-3 relative bg-white">
      <img
        src={product.imageCover || "https://via.placeholder.com/300x300?text=Product"}
        alt={product.title}
        className="w-full h-40 sm:h-48 md:h-52 object-cover rounded-md"
      />

      <h3 className="font-semibold text-sm sm:text-base md:text-lg line-clamp-2 min-h-[40px] sm:min-h-[48px]">
        {product.title || "product"}
      </h3>

      <p className="text-base sm:text-lg md:text-xl font-bold text-blue-700">
        ${product.price?.toFixed(2) || "0.00"}
      </p>

      <div className="flex gap-2">
        <button
          onClick={handleAddToCart}
          disabled={isInCart || isAddingCart}
          className={`flex-1 py-2 text-xs sm:text-sm md:text-base rounded-md text-white font-medium transition-all duration-200 ${
            isInCart
              ? "bg-green-600 cursor-default"
              : isAddingCart
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isInCart
            ? "In cart"
            : isAddingCart
            ? "Adding..."
            : "Add to cart"}
        </button>

        <button
          onClick={handleWishlistToggle}
          className={`px-3 py-2 rounded-md transition-all duration-200 ${
            isInWishlist
              ? "bg-red-100 text-red-600 hover:bg-red-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          💘
        </button>
      </div>

      {message && (
        <div className="absolute top-2 right-2 bg-gray-900/90 text-white px-2 py-1 rounded-md text-xs sm:text-sm shadow-lg">
          {message}
        </div>
      )}
    </div>
  );
}
