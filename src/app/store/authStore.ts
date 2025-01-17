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
          body: JSON.stringify({ name, password }),
        });

        if (res.ok) {
          const { token, user }: { token: string; user: User } =
            await res.json();

          Cookies.set("jwtToken", token);

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
        throw error;
      }
    },

    logout: () => {
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
