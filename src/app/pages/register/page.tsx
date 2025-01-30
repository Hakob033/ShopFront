"use client";

import React, { useState, useRef, useEffect } from "react";
import "../../globals.css";
import Eye from "../../icons/eye";
import EyeSlash from "../../icons/eyeSlash";
import { useRouter } from "next/navigation";
import Loading from "../../../components/loading";
import Link from "next/link";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [isTaken, setIsTaken] = useState(false);
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkUsernameAvailability = async (name: string): Promise<boolean> => {
    try {
      const response = await fetch(`${baseUrl}auth/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      return response.ok;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPassword(!confirmPassword);

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      router.push("/");
    } else {
      setIsLoggedIn(true);
    }
  }, [router]);

  if (isLoggedIn === null) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    if (!name || !password || confirmPasswordValue !== password) {
      return;
    }

    const isAvailable = await checkUsernameAvailability(name);

    if (!isAvailable) {
      setIsTaken(true);
      return;
    } else {
      setIsTaken(false);
    }

    const userData = { name, password };

    try {
      const response = await fetch(`${baseUrl}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Fetch error details:", errorDetails);
        throw new Error("Registration failed");
      }

      router.push("/pages/login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Register
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            {isTaken && (
              <div className="text-center text-sm text-red">
                Username is taken
              </div>
            )}
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          {passwordError && (
            <div className="text-red text-sm text-center mt-2">
              {passwordError}
            </div>
          )}

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

          <div className="mb-4 relative">
            <input
              type={confirmPassword ? "text" : "password"}
              id="confirm-password"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="Confirm Password"
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
            />
            <span
              className="absolute inset-y-0 right-3 text-xs flex items-center text-dark cursor-pointer transition-colors"
              onClick={toggleConfirmPasswordVisibility}
            >
              {confirmPassword ? <EyeSlash /> : <Eye />}
            </span>
          </div>

          <button
            ref={submitRef}
            type="submit"
            className="w-full px-4 py-2 text-white bg-medium rounded-xl outline-none"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/pages/login" className="text-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
