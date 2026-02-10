"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchWishlistItems,
  removeWishlistItem,
} from "@/features/wishlistSlice";
import { addCartItem } from "@/features/cartSlice";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";

export default function WishlistPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlist
  );

  useEffect(() => {
    dispatch(fetchWishlistItems());
  }, [dispatch]);

  const handleRemove = (productId: string) => {
    if (window.confirm("Do you sure for removing from wishlist ?")) {
      dispatch(removeWishlistItem(productId));
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6 container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-left">My Wishlist</h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <p className="text-red-600 text-center text-xl font-medium">{error}</p>
        ) : wishlist.length === 0 ? (
          <p className="text-center text-gray-600 text-xl py-10">
           Wishlist is empty
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => {
              const safePrice = Number(item.price) || 0;

              return (
                <div
                  key={item._id || item.id || Math.random().toString()} 
                  className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center gap-3 bg-white"
                >
                  <img
                    src={item.imageCover || "https://placehold.co/160x160?text=No+Image"}
                    alt={item.title || "product"}
                    className="w-40 h-40 object-cover rounded-md"
                  />
                  <h3 className="font-semibold text-center line-clamp-2 text-lg">
                    {item.title || "Product without title"}
                  </h3>
                  <p className="text-blue-600 font-bold text-xl">
                    ${safePrice.toFixed(2)}
                  </p>
                  <div className="flex gap-3 w-full">
                    <button
                      onClick={() => {
                        console.log("Adding productId:", item._id); 
                        dispatch(addCartItem(item._id)); 
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                     Add to cart
                    </button>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="flex-1 bg-red-100 text-red-600 py-2 rounded hover:bg-red-200 transition"
                    >
                     Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}