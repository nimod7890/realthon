import useGetReport from "@hooks/query/useGetReport";
import cn from "@utils/shadcn";

type ReportProps = { date: Date };

export default function Report({ date }: ReportProps) {
  const { report } = useGetReport(date);
  console.log(date);

  const formattedDate = date.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });

  return (
    <div className="flex flex-col gap-6 w-full p-4 bg-white shadow rounded-md">
      {/* 상단 제목 섹션 */}
      {(() => {
        return (
          <>
            <div className="flex flex-col justify-center items-center text-center gap-2">
              <p className="font-medium text-xl">
                <span className="text-lime-800">{formattedDate}</span>의 에너지 리포트
              </p>
              <p className="text-detail-2 text-gray-600">
                샤워 시간, 전자기기 사용, 내가 직접 작성한 기록까지.
                <br />
                AI가 절약 성과를 똑똑하게 분석했어요.
              </p>
            </div>

            {/* 점수 섹션 */}
            <div className="flex flex-row justify-between items-center gap-5 text-center bg-lime-100 p-4 rounded-md">
              <p className="font-bold text-detail-1 text-lime-800 w-[200px]">
                오늘의 <span className="text-lime-500">추정 탄소 배출량</span>은
              </p>
              {/* 점수 표시 */}
              <GreenPointBar dailyexp={report.dailyexp} />
            </div>

            {/* 데이터 카드 섹션 */}
            <div className="flex flex-col gap-4">
              {/* 샤워 시간 카드 */}
              <div className="flex flex-col bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="font-medium text-body-4 text-lime-800">샤워 시간 🚿</p>
                <p className="text-detail-1 text-gray-700">
                  이날 샤워 시간은{" "}
                  <span className="font-bold text-lime-500">{report.replies[0]}분</span>
                  이에요.
                </p>
              </div>

              {/* 전자기기 사용 시간 카드 */}
              <div className="flex flex-col bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="font-medium text-body-4 text-lime-800">전자기기 사용 시간 💻</p>
                <p className="text-detail-1 text-gray-700">
                  이날 전자기기를{" "}
                  <span className="font-bold text-lime-500">{report.replies[1]}분</span> 사용했어요.
                </p>
              </div>

              {/* 소비 기록 카드 */}
              <div className="flex flex-col bg-gray-50 p-4 rounded-md shadow-sm">
                <p className="font-medium text-body-4 text-lime-800">소비 기록 📋</p>
                <p className="text-detail-1 text-gray-700">
                  <span className="font-semibold">{report.replies[2]}</span>
                </p>
              </div>

              {/* AI 리포트 카드 */}
              <div className="flex flex-col bg-lime-50 p-5 rounded-lg shadow-lg border border-lime-300">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-body-4 text-lime-800">AI 리포트 🤖</p>
                </div>
                <p className="text-detail-1 text-gray-700 mt-3 leading-relaxed">
                  {report.aiFeedBack}
                </p>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
}

function GreenPointBar({ dailyexp }: { dailyexp: number }) {
  const color = dailyexp >= 0 ? "bg-lime-500" : "bg-rose-500";
  return (
    <div className="relative w-full flex items-center justify-center mx-3">
      {/* 점수 바 */}
      <div className="w-full h-4 bg-gray-200 rounded-15 relative overflow-hidden">
        <div
          className={cn(color, "h-full transition-all")}
          style={{
            width: `${((dailyexp + 10) / 20) * 100}%`, // -10~10 사이 값을 퍼센트로 변환
          }}
        />
      </div>
      {/* 점수 위치 표시 */}
      <div
        className={cn(
          color,
          "font-bold text-detail-1 absolute w-8 h-8 text-white text-center rounded-15 flex items-center justify-center shadow-md",
        )}
        style={{
          left: `${((dailyexp + 10) / 20) * 100}%`, // -10~20 사이 값을 퍼센트로 변환
          transform: "translateX(-50%)",
        }}
      >
        {dailyexp}
      </div>
    </div>
  );
}
