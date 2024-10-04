import { Outlet } from "react-router-dom";
import "./index.css";
import Sidebar from "@/components/sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen w-full h-full flex-col bg-muted/40">
      <Sidebar />
      <div className="content flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
