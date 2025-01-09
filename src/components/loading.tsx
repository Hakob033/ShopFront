"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute w-full h-full border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          <div className="absolute w-full h-full border-4 border-t-transparent border-green-500 rounded-full animate-spin-[2s]"></div>
        </div>
        <span className="text-lg text-gray-700 font-medium animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
