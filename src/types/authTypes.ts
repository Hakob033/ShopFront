export interface User {
  id: number;
  name: string;
  username: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
  restoreSession: () => void;
}
