"use client";

import React, { useState } from "react";
import "../../globals.css";
import Eye from "../../icons/eye";
import EyeSlash from "../../icons/eyeSlash";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthStore } from "../../store/authStore"; // Import your store

export default function Login() {
  const router = useRouter();
  const { login } = AuthStore(); // Access login function from your store
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    if (!name || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true); // Start loading state
    try {
      // Use the store's login method, which already includes the API call
      await login(name, password);

      // Redirect to home page after successful login
      router.push("/");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>
        {error && (
          <div className="text-red-500 text-sm text-center mt-2">{error}</div>
        )}
        <form className="mt-4" onSubmit={handleLogin}>
          {/* Name Input */}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-3 text-xs flex items-center text-dark cursor-pointer transition-colors"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white rounded-xl ${
              loading ? "bg-gray-500" : "bg-medium"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Link to Register Page */}
        <div className="mt-4 text-center">
          <p>
            <span>Don't have an account?</span>
            <Link
              href="/pages/register"
              className="text-blue-500 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
