import { Button } from "@components/ui/button";

interface ErrorFallbackProps {
  errorMessage: string;
  reset: () => void;
}

export default function ErrorContainer({ errorMessage, reset }: ErrorFallbackProps) {
  return (
    <div
      role="alert"
      className="flex p-10 h-screen w-screen flex-col items-center justify-center gap-10"
    >
      <h4>{errorMessage}</h4>
      <Button size={"lg"} className="w-[200px]" onClick={reset}>
        홈으로 돌아가기
      </Button>
    </div>
  );
}
