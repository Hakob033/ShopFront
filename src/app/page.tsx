"use client";

import { Poppins } from "next/font/google";
import TableHeader from "../components/header";
import ProductTable from "../components/productTable";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const App = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <TableHeader />
      <ProductTable />
    </div>
  );
};

export default App;
