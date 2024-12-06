import Logo from "@components/layout/header/Logo";
import { Outlet } from "react-router-dom";
import { Separator } from "@components/ui/separator";
import { Link } from "react-router-dom";
import RoutePath from "@routes/routePath";
import useInitialize from "@hooks/useInitialize";
import MyExp from "@components/layout/header/MyExp";
import DiaryCreateButton from "@components/layout/header/DiaryCreateButton";

export default function Layout() {
  useInitialize();

  return (
    <div className="relative flex h-screen min-w-max flex-col overflow-hidden bg-lime-50">
      <div className="sticky top-0 z-50 flex justify-between px-8 py-6 h-12 items-center bg-lime-100">
        <Link to={RoutePath.Index}>
          <Logo />
        </Link>
        <MyExp />
        <DiaryCreateButton />
      </div>
      <Separator className="opacity-40" />
      <main className="flex flex-grow flex-col justify-between overflow-scroll bg-lime-50 pt-10">
        <Outlet />
      </main>
    </div>
  );
}
