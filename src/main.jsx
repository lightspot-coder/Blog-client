import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
//import './index.css'
import App from "./App.jsx";
import Showblogs from "./ShowBlogs.jsx";
import Login from "./Login.jsx";
import Showposts from "./ShowPosts.jsx";
import Showpost from "./ShowPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "blogs",
    element: <Showblogs />,
  },
  {
    path: "/blogs/:blogId/posts",
    element: <Showposts />,
  },
  {
    path: "/blogs/:blogId/posts/:postId",
    element: <Showpost />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
