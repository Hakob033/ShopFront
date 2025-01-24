import { create } from "zustand";
import { AuthState, User } from "../../types/authTypes";
import Cookies from "js-cookie";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const AuthStore = create<AuthState>((set) => {
  const restoreSession = () => {
    const token = Cookies.get("jwtToken");
    if (token) {
      set({ token, isAuthenticated: true });
    }
  };

  restoreSession();

  return {
    user: null,
    token: null,
    isAuthenticated: false,

    login: async (name: string, password: string) => {
      try {
        const res = await fetch(`${baseUrl}auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        });

        if (res.ok) {
          const { token, user }: { token: string; user: User } =
            await res.json();

          Cookies.set("jwtToken", token);
          localStorage.setItem("userName", user.name);

          set({
            user,
            token,
            isAuthenticated: true,
          });
        } else {
          const errorData = await res.json();
          if (errorData.message === "Invalid username or password.") {
            throw new Error("Invalid username or password.");
          } else {
            throw new Error("Login failed. Please try again.");
          }
        }
      } catch (error) {
        throw error;
      }
    },

    logout: () => {
      localStorage.removeItem("userName");
      Cookies.remove("jwtToken");
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    },

    restoreSession,
  };
});
