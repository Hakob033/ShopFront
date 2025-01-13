import React, { useState } from "react";
import Image from "../../app/icons/image";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void; // Callback to send image URL to parent
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Generate a local preview of the image
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      const formData = new FormData();
      formData.append("image", file);

      try {
        // Upload the image to the server
        const response = await fetch("http://localhost:3001/uploads", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        if (data.imageUrl) {
          onImageUpload(data.imageUrl); // Pass uploaded image URL to parent
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center border rounded-lg p-6">
      <label
        htmlFor="imageUpload"
        className="flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="flex flex-col items-center text-gray-400">
          <Image />
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
      {/* Show image preview */}
      {imagePreviewUrl && (
        <div className="mt-4">
          <img
            src={imagePreviewUrl}
            alt="Uploaded preview"
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
