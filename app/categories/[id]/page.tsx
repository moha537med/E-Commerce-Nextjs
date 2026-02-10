"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getCategoryById } from "@/services/productService";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function CategoryDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getCategoryById(id)
      .then((res) => {
        setCategory(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!category) return <p>Category not found</p>;

  return (
    <ProtectedRoute>
      <div className="p-6 flex flex-col items-center">
        <img src={category.image} alt={category.name} className="w-64 h-64 object-cover rounded mb-4" />
        <h2 className="text-3xl font-bold">{category.name}</h2>
      </div>
    </ProtectedRoute>
  );
}
