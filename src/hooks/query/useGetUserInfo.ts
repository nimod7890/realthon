import useAuth from "@hooks/useAuth";
import QueryKeys from "@libraries/reactQuery/queryKeys";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import http from "@utils/api";
import CustomError from "@utils/api/error";
import { useEffect } from "react";

export default function useGetUserInfo() {
  const { token, clearAuthData } = useAuth();
  const { data: userInfo, status, ...props } = useQuery<User>(userInfoQueryOptions(token));

  useEffect(() => {
    if (status === "error") {
      clearAuthData();
      throw new CustomError("유저 정보를 불러오는 중에 문제가 발생하였습니다.", 400);
    }
  }, [status]);

  return { userInfo: userInfo as User, ...props };
}

export const userInfoQueryOptions = (token: string | null): UseQueryOptions<User> => ({
  queryKey: [QueryKeys.User, token],
  queryFn: () => http.be.get(`/users`) as Promise<User>,
  // queryFn: () => Promise.resolve({ id: 1, name: "오드", totalExp: 113 }),
  enabled: Boolean(token),
});
