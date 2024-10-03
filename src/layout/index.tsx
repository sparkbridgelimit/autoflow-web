import { Outlet } from "react-router-dom";
import "./index.css";
import Sidebar from "@/components/sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
