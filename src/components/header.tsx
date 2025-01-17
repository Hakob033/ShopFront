import React, { useState } from "react";
import { AuthStore } from "../app/store/authStore";
import Logout from "../app/icons/logout";
import { useRouter } from "next/navigation";
import SearchBar from "./search";
import StatusFilter from "./statusFilter";
import Link from "next/link";

const TableHeader = ({ setStatus }) => {
  const { user, logout, isAuthenticated } = AuthStore();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logout(); // Perform logout
    router.push("/pages/login"); // Redirect to login page
  };

  return (
    <div className="p-2 bg-gray-50">
      <div className="flex items-center justify-between">
        <div className="flex justify-center items-center gap-2">
          {isAuthenticated ? (
            <span className="text-dark">{user.name}</span>
          ) : (
            <span className="text-dark">Guest</span>
          )}
          <button onClick={() => setShowModal(true)} className="text-red-500">
            <Logout />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar />
          <StatusFilter onChange={setStatus} />
          <Link href="/pages/addItem">
            <button className="px-6 py-2 text-nowrap rounded-xl text-white bg-medium">
              New Product
            </button>
          </Link>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-center text-gray-800">
              Do you want to logout?
            </h2>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                No, Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-[#FF115C] rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableHeader;
