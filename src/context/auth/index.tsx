import { PropsWithChildren, useCallback, useMemo } from "react";
import AuthContext from "src/context/auth/AuthContext.ts";
import useUserStorage from "@hooks/storage/useUserStorage";
import useTokenStorage from "@hooks/storage/useTokenStorage";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser, clearUser] = useUserStorage();
  const [token, setToken, clearToken] = useTokenStorage();

  const setAuthData = useCallback(
    ({ user, token }: Partial<{ user: User; token: string }>) => {
      if (user) setUser(user);
      if (token) setToken(token);
    },
    [setUser],
  );

  const clearAuthData = useCallback(() => {
    clearUser();
    clearToken();
    window.location.reload();
  }, [clearUser]);

  const authContext = useMemo(
    () => ({
      isAuthenticated: Boolean(token),
      user,
      token,
      setAuthData,
      clearAuthData,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}
