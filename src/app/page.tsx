"use client";

import { Poppins } from "next/font/google";
import TableHeader from "../components/header";
import ProductTable from "../components/productTable";
import { useState } from "react";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const App = () => {
  const [status, setStatus] = useState<string>(""); // Shared state for status

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <TableHeader setStatus={setStatus} />
      <ProductTable status={status} />
    </div>
  );
};

export default App;
