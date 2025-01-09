"use client";

import React, { useState, useRef, useEffect } from "react";
import "../../globals.css";
import Eye from "@/app/icons/eye";
import EyeSlash from "@/app/icons/eyeSlash";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const router = useRouter();

  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

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
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextField?: any
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextField) {
        nextField.current?.focus();
      } else {
        submitRef.current?.click();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (name && password && confirmPasswordValue === password) {
      const userData = {
        name,
        password,
      };

      try {
        const response = await fetch("http://localhost:3001/auth/register", {
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

        const data = await response.json();
        console.log("Registration successful:", data);
        router.push("/api/login");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log("Please fill in all fields correctly.");
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
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              ref={passwordRef}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
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
              ref={confirmPasswordRef}
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-dark rounded-xl outline-none"
              placeholder="Confirm Password"
              value={confirmPasswordValue}
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, submitRef)}
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
      </div>
    </div>
  );
}
