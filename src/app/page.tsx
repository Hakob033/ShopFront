"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
// import ProductTable from "./components/table";
// import SearchBar from "./components/searchBar";
// import StatusFilter from "./components/statusFilter";
// import Logout from "@/icons/logout";
import { ProductStore } from "./store/productStore";

const font = Poppins({
  weight: ["600"],
  subsets: ["latin"],
});

const App = () => {
  const { user, logout, isAuthenticated } = ProductStore(); // Get user and logout from store
  console.log(isAuthenticated);

  return <div className="p-6 bg-gray-50 min-h-screen"></div>;
};

export default App;
