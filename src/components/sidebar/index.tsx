import { Link } from "react-router-dom";
import {
  Home,
  Package,
  Package2,
  PanelLeft,
  Settings,
  ShoppingCart,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          to="/"
        >
          <Package className="h-5 w-5" />
          <span className="sr-only">Products</span>
        </Link>
      </nav>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          to="/"
        >
          <Home className="h-5 w-5" />
          <span className="sr-only">Dashboard</span>
        </Link>
      </nav>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          to="/"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Orders</span>
        </Link>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          to="/"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
