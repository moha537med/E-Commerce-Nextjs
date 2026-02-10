"use client";

import { useEffect, useState } from "react";
import { getBrands } from "@/services/productService";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

interface Brand {
  _id: string;
  name: string;
  image: string;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getBrands()
      .then((res) => {
        setBrands(res.data.data);
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
        <h2 className="text-2xl font-bold mb-4">Brands</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div
                key={brand._id}
                className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
                onClick={() => router.push(`/brands/${brand._id}`)}
              >
                <img src={brand.image} alt={brand.name} className="w-32 h-32 object-cover mb-2 rounded" />
                <h3 className="font-semibold">{brand.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
