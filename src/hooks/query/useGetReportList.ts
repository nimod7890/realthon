import QueryKeys from "@libraries/reactQuery/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import http from "@utils/api";

export type Report = {
  id: number;
  createdAt: Date;
  dailyExp: number;
};

export default function useGetReportList() {
  const { data, ...props } = useSuspenseQuery<{ reports: Report[] }>({
    queryKey: [QueryKeys.ReportList],
    queryFn: () => http.be.get(`/reports/list`),
  });

  return { reports: data.reports, ...props };
}
