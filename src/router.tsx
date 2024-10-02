import { createBrowserRouter } from "react-router-dom";
import Workflow from "@/pages/workflow";
import Layout from "@/layout";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Workflow />,
      },
    ],
  },

  {
    path: "*",
    element: <div>404</div>,
  },
];

export const router = createBrowserRouter(routes);

export default router;
