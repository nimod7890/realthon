import ErrorContainer from "@components/common/ErrorContainer";
import parsedErrorMsg from "@constants/parsedErrorMsg";
import RoutePath from "@routes/routePath";
import CustomError from "@utils/api/error";
import { useMemo } from "react";
import { useRouteError, useNavigate } from "react-router-dom";

export default function ErrorPage({ message }: { message?: string }) {
  const error = useRouteError() as CustomError;

  const navigate = useNavigate();

  const errorMessage = useMemo(() => parsedErrorMsg(error?.status), [error]);

  return (
    <ErrorContainer
      errorMessage={message ?? errorMessage}
      reset={() => navigate(RoutePath.Index)}
    />
  );
}
