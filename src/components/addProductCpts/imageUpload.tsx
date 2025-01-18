import React, { useState } from "react";
import ImageIcon from "../../app/icons/image";
import Image from "next/image";
import Refresh from "../../app/icons/refresh";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:3001/uploads", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        if (data.imageUrl) {
          onImageUpload(data.imageUrl);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="relative flex flex-col h-72 w-72 items-center justify-center border rounded-lg">
      {!imagePreviewUrl && (
        <label
          htmlFor="imageUpload"
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="flex flex-col items-center text-gray-400">
            <ImageIcon />
            <span className="mt-2 text-sm">Product Image</span>
          </div>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      )}

      {imagePreviewUrl && (
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            height={270}
            width={270}
            src={imagePreviewUrl}
            alt="Uploaded preview"
            priority={true}
            className="h-full w-full object-cover rounded-lg"
          />
          <button
            onClick={() => document.getElementById("imageUpload")?.click()}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <Refresh />
          </button>
        </div>
      )}

      <input
        id="imageUpload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUpload;
