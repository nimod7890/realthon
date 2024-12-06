import useTokenStorage from "@hooks/storage/useTokenStorage";
import useUserStorage from "@hooks/storage/useUserStorage";
import QueryKeys from "@libraries/reactQuery/queryKeys";
import RoutePath from "@routes/routePath";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@utils/api";

export type ReportFormData = { shower: number; energy: number; diary: string };

export default function useCreateReport() {
  const queryClient = useQueryClient();

  const [token] = useTokenStorage();
  const [user] = useUserStorage();

  return useMutation({
    mutationFn: async ({ shower, energy, diary, date }: ReportFormData & { date: Date }) => {
      await http.be.post("/answers", { replies: [shower, energy, diary], createdAt: date });
      await http.ai.post("/process_responses", {
        date,
        id: user?.id,
        replies: [shower, energy, diary],
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.User, token] });
      window.location.href = RoutePath.Index;
    },
  });
}
