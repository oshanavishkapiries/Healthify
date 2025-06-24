import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AuthMiddleware from "./components/auth/AuthMiddleware";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import SignupDetails from "./pages/auth/SignupDetails";
import ForgetPassword from "./pages/auth/ForgetPassword";
import EmailVerify from "./pages/auth/EmailVerify";
import ChangePassword from "./pages/auth/ChangePassword";
import Blog from "./pages/Blog";
import BlogView from "./pages/BlogView";
import Bookmark from "./pages/Bookmark";
import BlogCreate from "./pages/BlogCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogView />,
      },
      {
        path: "bookmarks",
        element: <Bookmark />,
      },
      {
        path: "blog/create",
        element: (
          <AuthMiddleware>
            <BlogCreate />
          </AuthMiddleware>
        ),
      },
      {
        path: "blog/edit/:id",
        element: (
          <AuthMiddleware>
            <BlogCreate />
          </AuthMiddleware>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signup-details",
        element: <SignupDetails />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "verify-email",
        element: <EmailVerify />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);
