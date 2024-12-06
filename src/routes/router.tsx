import { Outlet, RouteObject, createBrowserRouter } from "react-router-dom";
import RoutePath from "@routes/routePath";
import AuthProvider from "@/context/auth";
import ErrorPage from "@pages/error/ErrorPage";
import { Suspense } from "react";
import GlobalFallback from "@components/layout/pending/GlobalFallback";
import Layout from "@components/index";
import NotFoundErrorPage from "@pages/error/NotFoundErrorPage";
import root from "@routes/loader/root";
import HomePage from "@pages/HomePage";
import LoginPage from "@pages/LoginPage";

const routes: RouteObject[] = [
  {
    path: RoutePath.Index,
    loader: root,
    errorElement: <ErrorPage message="알 수 없는 오류가 발생했어요!" />,
    element: (
      <Suspense fallback={<GlobalFallback />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        element: (
          <AuthProvider>
            <Layout />
          </AuthProvider>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<GlobalFallback />}>
                <HomePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: RoutePath.Login,
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundErrorPage />,
  },
];

const Router = createBrowserRouter(routes);

export default Router;
