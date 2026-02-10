"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function Navbar() {
  const { token } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-200">
          ShopMart
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/products" className="hover:text-gray-200">Products</Link>
          <Link href="/categories" className="hover:text-gray-200">Categories</Link>
          <Link href="/brands" className="hover:text-gray-200">Brands</Link>

          {token ? (
            <>
              <Link href="/cart" className="hover:text-gray-200">Cart</Link>
              <Link href="/wishlist" className="hover:text-gray-200">Wishlist</Link>
              <Link href="/orders" className="hover:text-gray-200">Orders</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-200">Login</Link>
              <Link href="/register" className="hover:text-gray-200">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-600 px-6 pb-4 flex flex-col gap-3">
          <Link href="/products" className="hover:text-gray-200">Products</Link>
          <Link href="/categories" className="hover:text-gray-200">Categories</Link>
          <Link href="/brands" className="hover:text-gray-200">Brands</Link>

          {token ? (
            <>
              <Link href="/cart" className="hover:text-gray-200">Cart</Link>
              <Link href="/wishlist" className="hover:text-gray-200">Wishlist</Link>
              <Link href="/orders" className="hover:text-gray-200">Orders</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-200">Login</Link>
              <Link href="/register" className="hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
