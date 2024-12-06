import ErrorContainer from "@components/common/ErrorContainer";
import parsedErrorMsg from "@constants/parsedErrorMsg";
import { PropsWithChildren, useMemo } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

export default function GlobalErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={window.location.reload}>
      {children}
    </ErrorBoundary>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = useMemo(() => parsedErrorMsg(error?.status), [error]);

  return <ErrorContainer errorMessage={errorMessage} reset={resetErrorBoundary} />;
}
