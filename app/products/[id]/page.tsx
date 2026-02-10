// src/app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getProductById } from "@/services/productService";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addCartItem } from "@/features/cartSlice";
import { addWishlistItem } from "@/features/wishlistSlice";
import Loader from "@/components/Loader";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((res) => {
          setProduct(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <Loader />;
  if (!product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <ProtectedRoute>
      <div className="p-6 flex flex-col items-center gap-4 max-w-4xl mx-auto">
        <img
          src={product.imageCover}
          alt={product.title}
          width={400}
          height={400}
          className="rounded object-cover"
        />
        <h2 className="text-3xl font-bold text-center">{product.title}</h2>
        <p className="text-blue-600 font-bold text-xl">${product.price.toFixed(2)}</p>
        <p className="text-gray-600 text-center">{product.description}</p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => dispatch(addCartItem(product._id))}
            className="bg-blue-600 text-white py-3 px-8 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => dispatch(addWishlistItem(product._id))}
            className="bg-gray-200 text-black py-3 px-8 rounded hover:bg-gray-300 transition"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}