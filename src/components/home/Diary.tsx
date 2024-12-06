import Report from "@components/home/Report";
import { Calendar } from "@components/ui/calendar";
import { Suspense, useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Diary() {
  const [date, setDate] = useState<Date>(new Date());

  const handleClickDate = useCallback(
    (clickedDate: Date | undefined) => {
      if (!clickedDate || clickedDate > new Date()) return;
      setDate(clickedDate);
    },
    [date],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col justify-center items-center">
        <h6>나의 에너지 소비 다이어리</h6>
        <p className="text-body-3">차근차근 모은 기록이 쌓여가고 있어요.</p>
      </div>
      <div className="flex flex-row justify-center gap-15">
        <Calendar mode="single" selected={date} onSelect={handleClickDate} className="rounded-md" />
        <div className="w-[500px]">
          <ErrorBoundary FallbackComponent={EmptyReport}>
            <Suspense
              fallback={<p className="text-center font-medium">소비 기록을 불러오는 중...</p>}
            >
              <Report date={date} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
}

function EmptyReport() {
  return <p className="font-medium text-xl">이 날짜에 해당하는 에너지 리포트가 아직 없어요</p>;
}
