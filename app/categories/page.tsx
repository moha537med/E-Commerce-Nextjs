"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/productService";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
                onClick={() => router.push(`/categories/${cat._id}`)}
              >
                <img src={cat.image} alt={cat.name} className="w-32 h-32 object-cover mb-2 rounded" />
                <h3 className="font-semibold">{cat.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
