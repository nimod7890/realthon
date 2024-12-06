import Logo from "@components/layout/header/Logo";
import { Outlet } from "react-router-dom";
import { Separator } from "@components/ui/separator";
import { Link } from "react-router-dom";
import RoutePath from "@routes/routePath";
import useInitialize from "@hooks/useInitialize";

export default function Layout() {
  useInitialize();

  return (
    <div className="relative flex h-screen min-w-max flex-col overflow-hidden">
      <div className="sticky top-0 z-50 flex justify-between px-8 py-6 h-9 items-center">
        <Link to={RoutePath.Index}>
          <Logo />
        </Link>
        <div />
      </div>
      <Separator />
      <main className="flex flex-grow flex-col justify-between overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}
