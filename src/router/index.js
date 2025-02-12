import Layout from "@/pages/Layout";
import Month from "@/pages/Month";
import Year from "@/pages/Year";
import New from "@/pages/New";
import Welcome from "@/pages/Welcome";
import Login from "@/pages/Login"; // 假设你已经创建了 Login 页面
import Register from "@/pages/Register"; // 假设你已经创建了 Register 页面
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // 父级布局组件，包含子路由
    children: [
      {
        path: "month", // 子路由 month
        element: <Month />,
      },
      {
        path: "year", // 子路由 year
        element: <Year />,
      },
      {
        path: "new", // 子路由 new
        element: <New />,
      },
    ],
  },
  {
    path: "/welcome", // 欢迎页
    element: <Welcome />,
  },
  {
    path: "/login", // 登录页
    element: <Login />,
  },
  {
    path: "/register", // 注册页
    element: <Register />,
  },
]);

export default router;
