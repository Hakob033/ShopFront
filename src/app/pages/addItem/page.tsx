"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ModalHeader from "../../../components/addProductCpts/modalHeader";
import Step1 from "../../../components/addProductCpts/step1";
import Step2 from "../../../components/addProductCpts/step2";

const AddProduct = () => {
  const [step, setStep] = useState(1);
  const [skuCheck, setSkuCheck] = useState(false); // Updated variable name

  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    stockQuantity: "",
    description: "",
    imageUrl: "",
  });

  const router = useRouter();

  const validateSku = async (sku: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3001/api/skuCheck", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sku }),
      });

      if (!response.ok) {
        return false;
      }

      return true; // SKU is available
    } catch (error) {
      console.error("Error validating SKU:", error);
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    const updatedValue =
      name === "price" || name === "stockQuantity"
        ? value === "" // Allow empty values
          ? ""
          : parseFloat(value) // Convert to float for decimal numbers
        : value;

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);
  const handleAdd = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      const result = await response.json();
      console.log("Product added:", result);
      router.push("/");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
        <ModalHeader onClose={handleCancel} />
        {step === 1 ? (
          <Step1
            formData={formData}
            onChange={handleInputChange}
            onNext={handleNext}
            onCancel={handleCancel}
            onValidate={validateSku}
            onSkuCheck={setSkuCheck} // Passing correctly
            skuCheck={skuCheck} // Passing skuCheck as a prop
          />
        ) : (
          <Step2
            formData={formData}
            onChange={handleInputChange}
            onBack={handleBack}
            onAdd={handleAdd}
          />
        )}
      </div>
    </div>
  );
};

export default AddProduct;
