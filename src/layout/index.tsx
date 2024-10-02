import { Outlet } from "react-router-dom";
import "./index.css";

function Layout() {
  return (
    <div className="app">
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;