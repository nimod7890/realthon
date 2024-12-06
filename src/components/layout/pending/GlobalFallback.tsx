import DeferredWrapper from "@components/common/DeferredWrapper";
import PendingContainer from "@components/layout/pending/PendingContainer";

export default function GlobalFallback() {
  return (
    <DeferredWrapper>
      <PendingContainer message="페이지 정보를 불러오는 중입니다" />
    </DeferredWrapper>
  );
}
