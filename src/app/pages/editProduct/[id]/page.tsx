"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Step1 from "../../../../components/editProductsCpts/step1";
import Step2 from "../../../../components/editProductsCpts/step2";
import { Product } from "../../../../types/productTypes";
import IconX from "../../../icons/iconX";
import Loading from "../../../../components/loading";

const EditProduct: React.FC = () => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      setId(url.pathname.split("/").pop()!);
    }
  }, []);

  const [formData, setFormData] = useState<Product | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product data");

        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const updatedValue =
      name === "price" || name === "stockQuantity" ? Number(value) : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleImageUpload = (imageUrl: string) => {
    setFormData((prev) => (prev ? { ...prev, imageUrl } : null));
  };

  const handleSave = async () => {
    try {
      if (!formData) return;

      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update product");
      router.push("/");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!formData) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg flex justify-center items-center min-h-screen">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {currentStep === 1 ? "Edit product" : "New product"}
          </h1>
          <button
            onClick={() => router.push("/")}
            className="text-gray-400 hover:text-gray-600"
          >
            <IconX />
          </button>
        </div>
        {currentStep === 1 ? (
          <Step1
            formData={formData}
            onChange={handleChange}
            onImageUpload={handleImageUpload}
            onNext={() => setCurrentStep(2)}
            onCancel={() => router.push("/")}
          />
        ) : (
          <Step2
            description={formData.description}
            onChange={handleChange}
            onBack={() => setCurrentStep(1)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;
