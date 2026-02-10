// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { placeOrder } from "@/features/ordersSlice";
import { clearCart } from "@/features/cartSlice";
import ProtectedRoute from "@/components/ProtectedRoute";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online">("cash");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { items: cartItems, cartId } = useSelector((state: RootState) => state.cart);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);

  const handlePlaceOrder = async () => {
    if (!cartId) {
      setErrorMsg("No active cart found");
      return;
    }
    if (!address.trim()) {
      setErrorMsg("Shipping address is required");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      await dispatch(
        placeOrder({
          cartId,
          address,
          paymentMethod,
          total,      
        })
      ).unwrap();

      dispatch(clearCart());
      alert("Order placed successfully!");
      router.push("/orders?success=true");
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to place order. Please try again.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="p-6 container mx-auto max-w-md">
        <h2 className="text-3xl font-bold mb-6">Checkout</h2>

        {errorMsg && (
          <p className="text-red-600 mb-4 text-center font-medium">{errorMsg}</p>
        )}

        {loading ? (
          <Loader />
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Shipping Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your full shipping address"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as "cash" | "online")}
                className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="cash">Cash on Delivery</option>
                <option value="online">Online Payment</option>
              </select>
            </div>

            <div className="text-xl font-bold text-center">
              Total: ${total.toFixed(2)}
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={loading || cartItems.length === 0}
              className={`w-full py-4 text-white font-bold rounded-lg transition ${
                loading || cartItems.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}