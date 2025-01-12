import React, { useState } from "react";
import Image from "../../app/icons/image";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const formData = new FormData();
      formData.append("image", file);

      // Upload the image using fetch
      fetch("http://localhost:3001/uploads", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json()) // Assuming the response is in JSON format
        .then((data) => {
          if (data.imageUrl) {
            onImageUpload(data.imageUrl); // Pass image URL to parent
          }
        })
        .catch((error) => {
          console.error("Error uploading image", error);
        });
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
    </div>
  );
};

export default ImageUpload;
