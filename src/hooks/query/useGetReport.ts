import QueryKeys from "@libraries/reactQuery/queryKeys";
import { useSuspenseQuery } from "@tanstack/react-query";
import http from "@utils/api";

type DailyReport = {
  id: number;
  createdAt: Date;
  dailyexp: number;
  replies: [string, string, string];
  aiFeedBack: string;
};

export default function useGetReport(date: Date) {
  const { data, ...props } = useSuspenseQuery<DailyReport>({
    queryKey: [QueryKeys.Report, date],
    queryFn: async () => {
      const parsedDate = changeTimeOnly(date.toISOString());

      const report: {
        id: number;
        dailyexp: number;
        userId: number;
        answersId: number;
        aiFeedBack: string;
        createdAt: Date;
      } = await http.be.get(`/reports?createdAt=${parsedDate}`);
      const answer: { replies: [string, string, string]; createdAt: Date } = await http.be.get(
        `/answers?createdAt=${parsedDate}`,
      );

      console.log(answer, report);
      return { ...report, ...answer };
    },
  });

  return { report: data, ...props };
}
function changeTimeOnly(dateString: string): string {
  // 원래 날짜 객체 생성
  const originalDate = new Date(dateString);

  // 시간 문자열에서 시간, 분, 초, 밀리초 추출
  const [hours, minutes, seconds] = "21:36:37.952".split(":");
  const [secondPart, milliseconds = "0"] = (seconds || "0").split(".");

  // 기존 날짜의 시간 정보 변경 (UTC 기준으로 설정)
  originalDate.setUTCHours(
    parseInt(hours, 10),
    parseInt(minutes, 10),
    parseInt(secondPart, 10),
    parseInt(milliseconds, 10),
  );

  // ISO 문자열 반환
  return originalDate.toISOString();
}
