"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { token } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/products" className="text-2xl font-bold hover:text-gray-200">
          ShopMart
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/products" className="hover:text-gray-200">
            Products
          </Link>
          <Link href="/categories" className="hover:text-gray-200">
            Categories
          </Link>
          <Link href="/brands" className="hover:text-gray-200">
            Brands
          </Link>

          {token ? (
            <>
              <Link href="/cart" className="hover:text-gray-200">
                Cart
              </Link>
              <Link href="/wishlist" className="hover:text-gray-200">
                Wishlist
              </Link>
              <Link href="/orders" className="hover:text-gray-200">
                Orders
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-200">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-200">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


