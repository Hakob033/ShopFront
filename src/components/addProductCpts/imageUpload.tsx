import React, { useState } from "react";
import ImageIcon from "../../app/icons/image";
import Image from "next/image";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
      setIsImageUploaded(true);

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
    <div className="flex flex-col h-72 w-72 items-center justify-center border rounded-lg">
      {!isImageUploaded && (
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
        <div className="">
          <Image
            height={270}
            width={270}
            src={imagePreviewUrl}
            alt="Uploaded preview"
            priority={true}
            className=" h-auto w-auto"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
