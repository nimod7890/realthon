import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  setAuthData: ({ user, accessToken }: Partial<{ user: User; accessToken: string }>) => void;
  clearAuthData: () => void;
}

const initialAuthContext = {
  isAuthenticated: false,
  user: null,
  token: null,
  setAuthData: async () => {},
  clearAuthData: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContext);

export default AuthContext;
