"use client";

import TableHeader from "../components/header";
import ProductTable from "../components/productTable";
import { useState } from "react";

const App = () => {
  const [status, setStatus] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  return (
    <div className="p-3 pt-0 bg-gray-50 min-h-screen">
      <TableHeader setStatus={setStatus} setSearch={setSearch} />
      <ProductTable status={status} search={search} />
    </div>
  );
};

export default App;
