"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getBrandById } from "@/services/productService";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandDetailsPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getBrandById(id)
        .then((res) => {
          setBrand(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!brand) return <p>Brand not found</p>;

  return (
    <ProtectedRoute>
      <div className="p-6 flex flex-col items-center">
        <img src={brand.image} alt={brand.name} className="w-64 h-64 object-cover rounded mb-4" />
        <h2 className="text-3xl font-bold">{brand.name}</h2>
      </div>
    </ProtectedRoute>
  );
}
