import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Main from "./pages/Main";
import Login from "./pages/member/Login";
import Signup from "./pages/member/Signup";
import LoginSuccess from "./components/LoginSuccess";
import Count from "./components/Count";
import Detail from "./pages/videos/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      { path: "video/:videoCode", element: <Detail /> },
      // :videoCode라고 명시하면 해당 페이지에서 useParam videoCode로 가져오기 가능 !
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login-success",
    element: <LoginSuccess />,
  },
  {
    path: "/count",
    element: <Count />,
  },
]);

export default router;
