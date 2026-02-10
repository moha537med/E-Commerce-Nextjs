"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ShopMart. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="#" className="hover:text-gray-400">Facebook</Link>
          <Link href="#" className="hover:text-gray-400">Twitter</Link>
          <Link href="#" className="hover:text-gray-400">Instagram</Link>
        </div>
      </div>
    </footer>
  );
}

