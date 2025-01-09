import React from "react";
import { AuthStore } from "../app/store/authStore";
import Logout from "../app/icons/logout";
import { useRouter } from "next/navigation";
import SearchBar from "./search";
import StatusFilter from "./statusFilter";
import Link from "next/link";

const TableHeader = () => {
  const { user, logout, isAuthenticated } = AuthStore();
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex justify-center items-center gap-2">
          {isAuthenticated ? (
            <span className="text-dark">{user.name}</span>
          ) : (
            <span className="text-dark">Guest</span>
          )}
          <button
            onClick={() => {
              router.push("/pages/login");
              logout();
            }}
            className="text-red-500"
          >
            <Logout />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <StatusFilter />
          <Link href="/addItem">
            <button className="px-6 py-2 text-nowrap rounded-xl text-white bg-medium">
              New Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
