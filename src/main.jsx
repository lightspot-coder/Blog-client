import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
//import './index.css'
import App from "./App.jsx";
import Showblogs from "./ShowBlogs.jsx";
import Login from "./Login.jsx";
import Showposts from "./ShowPosts.jsx";
import Showpost from "./ShowPost.jsx";
import Signup from "./Signup.jsx";
import CreateBlog from "./CreateBlog.jsx";
import Showblog from "./ShowBlog.jsx";
import CreatePost from "./CreatePost.jsx";
import Updatepost from "./UpdatePost.jsx";
import Deletepost from "./DeletePost.jsx";

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
    path: "signup",
    element: <Signup />,
  },
  {
    path: "createBlog",
    element: <CreateBlog />,
  },
  {
    path: "blog",
    element: <Showblog />,
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
    path: "/blogs/${blogId}/createpost",
    element: <CreatePost />,
  },
  {
    path: "/blogs/:blogId/posts/:postId",
    element: <Showpost />,
  },
  {
    path: "/blogs/:blogId/posts/:postId/update",
    element: <Updatepost />,
  },
  {
    path: "/blogs/:blogId/posts/:postId/delete",
    element: <Deletepost />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
