import useGetUserInfo from "@hooks/query/useGetUserInfo";
import { useLayoutEffect } from "react";
import useAuth from "src/hooks/useAuth.ts";

export default function useInitialize() {
  const { setAuthData } = useAuth();
  const { userInfo } = useGetUserInfo();

  useLayoutEffect(() => {
    if (userInfo) {
      setAuthData({ user: userInfo });
    }
  }, [userInfo]);
}
