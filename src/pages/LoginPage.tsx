import Logo from "@components/layout/header/Logo";
import { Button } from "@components/ui/button";
import { Form, FormField, FormItem, FormControl, FormLabel } from "@components/ui/form";
import { Input } from "@components/ui/input";
import useTokenStorage from "@hooks/storage/useTokenStorage";
import RoutePath from "@routes/routePath";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import http from "@utils/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface SigninFormData {
  email: string;
  password: string;
}

type SigninMutation = (data: SigninFormData) => void;

export default function LoginPage() {
  const form = useForm<SigninFormData>();
  const { control, handleSubmit } = form;
  const { mutate: signin } = useSignin();

  return (
    <div className="relative h-screen min-w-max overflow-hidden bg-orange-100 flex flex-col justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(signin as SigninMutation)}
          className="flex flex-col items-center w-[400px] justify-center bg-white p-10 rounded-3 gap-5"
        >
          <Logo />
          <p className="font-bold text-lime-800">로그인</p>
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lime-900">이메일</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="example@com" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-lime-900">비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="current-password"
                    placeholder="비밀번호"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">로그인</Button>
        </form>
      </Form>
    </div>
  );
}

function useSignin(): UseMutationResult<{ accessToken: string }, Error, SigninFormData> {
  const navigate = useNavigate();
  const [, setToken] = useTokenStorage();

  return useMutation({
    mutationFn: (data: SigninFormData) => http.be.post("/auth/login", data),
    onSuccess: ({ accessToken }) => {
      setToken(accessToken);
      navigate(RoutePath.Index);
    },
  });
}
