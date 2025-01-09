import { create } from "zustand";
import { AuthState, User } from "../../types/authTypes";
import Cookies from "js-cookie";

export const AuthStore = create<AuthState>((set) => {
  const restoreSession = () => {
    const token = Cookies.get("jwtToken");
    if (token) {
      set({ token, isAuthenticated: true });
    }
  };

  // Restore session immediately after store creation
  restoreSession();

  return {
    user: null,
    token: null,
    isAuthenticated: false,

    login: async (name: string, password: string) => {
      try {
        const res = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }), // Sending the login request
        });

        if (res.ok) {
          const { token, user }: { token: string; user: User } =
            await res.json();

          Cookies.set("jwtToken", token); // Save token in cookies

          set({
            user,
            token,
            isAuthenticated: true,
          });
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error; // Rethrow error to handle in UI (for example: showing an alert or message)
      }
    },

    logout: () => {
      Cookies.remove("jwtToken"); // Clear token from cookies
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },

    restoreSession, // Expose restoreSession if needed
  };
});
