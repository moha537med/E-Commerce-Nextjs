"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchOrders, Order } from "@/features/ordersSlice";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: orders, loading, error } = useSelector(
    (state: RootState) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading orders...</p>;

  if (error)
    return (
      <p className="text-center mt-10 text-red-600">
        Failed to fetch orders: {error}
      </p>
    );

  return (
    <ProtectedRoute>
      <div className="p-6 container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
          Your Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">
            You have no orders yet.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order: Order) => (
              <div
                key={order.id || Math.random()}
                className="border p-4 rounded shadow flex flex-col gap-2 bg-white"
              >
                <h3 className="text-xl font-semibold">
                  Order #{order.id || "Unknown"}
                </h3>

                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {order.address || "Not provided"}
                </p>

                <p>
                  <span className="font-semibold">Payment Method:</span>{" "}
                  {order.paymentMethod || "Not specified"}
                </p>

                <p>
                  <span className="font-semibold">Total:</span>{" "}
                  {order.total !== undefined
                    ? `$${order.total.toFixed(2)}`
                    : "$0.00"}
                </p>

                <div className="mt-2">
                  <h4 className="font-semibold">Products:</h4>
                  {order.products && order.products.length > 0 ? (
                    <ul className="list-disc list-inside">
                      {order.products.map((prod) => (
                        <li key={prod.id || Math.random()}>
                          {prod.title} - ${prod.price} × {prod.quantity}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No products</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
