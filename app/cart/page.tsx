/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  fetchCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "@/features/cartSlice";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, loading, error } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const getUnitPrice = (item: any) => {
    const count = Number(item.count) || 1;
    return count > 0 ? Number(item.price || 0) * count : 0;
  };
  const total = cartItems.reduce((acc, item) => acc + getUnitPrice(item), 0);


  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading Cart In Progress....</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-medium">
        Error : {error}
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="p-6 max-w-6xl mx-auto min-h-[70vh]">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center md:text-left">
         Cart Shopping
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
             Cart Shopping is empty
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
            >
             Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-10">
              {cartItems.map((item) => {
                const unitPrice = Number(item.price || 0);
                const itemTotal = getUnitPrice(item);

                return (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-all bg-white"
                  >
                    <div className="w-32 h-32 sm:w-28 sm:h-28 shrink-0">
                      <img
                        src={item.product?.imageCover || "https://via.placeholder.com/150"}
                        alt={item.product?.title || "product"}
                        className="w-full h-full object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/150?text=صورة+غير+متوفرة";
                        }}
                      />
                    </div>

                    <div className="flex-1 text-center sm:text-right">
                      <h3 className="font-semibold text-lg md:text-xl mb-2 line-clamp-2">
                        {item.product?.title || "Product without title"}
                      </h3>

                      <p className="text-blue-700 font-bold text-xl mb-1">
                        <span className="text-gray-500 text-base font-normal mr-2">
                          {unitPrice.toFixed(2)} $ for one
                        </span>
                      </p>

                      <p className="text-gray-800 font-medium text-lg">
                        product total : {itemTotal.toFixed(2)} $
                        <span className="text-gray-500 text-sm mr-2">
                          ({item.count} × {unitPrice.toFixed(2)})
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-3 sm:mt-0">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartItemQuantity({
                                productId: item.product._id,
                                count: Math.max(1, Number(item.count) - 1),
                              })
                            )
                          }
                          disabled={Number(item.count) <= 1}
                          className="px-5 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition text-xl"
                        >
                          −
                        </button>
                        <span className="px-6 py-2 font-bold text-xl min-w-14 text-center">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateCartItemQuantity({
                                productId: item.product._id,
                                count: Number(item.count) + 1,
                              })
                            )
                          }
                          className="px-5 py-2 bg-gray-100 hover:bg-gray-200 transition text-xl"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => dispatch(removeCartItem(item.product._id))}
                        className="px-6 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition font-medium min-w-22.5"
                      >
                       Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                <span className="text-2xl md:text-3xl font-bold text-gray-800">
                  Cart Shopping Total : 
                </span>
                <span className="text-3xl md:text-4xl font-extrabold text-blue-700">
                  {total.toFixed(2)} $
                </span>
              </div>

              <Link href="/address" className="block mt-8">
                <button className="w-full bg-green-600 text-white py-5 rounded-xl text-xl font-bold hover:bg-green-700 transition shadow-lg">
                 Confirm Order
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </ProtectedRoute>
  );
}