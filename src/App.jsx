//import './App.css'
import { useNavigate } from "react-router";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
      <h1>Welcome to the blog App {user ? user.name : "visitor"}</h1>
      <ul>
        {user ? (
          !user.blogId ? (
            <li>
              <a href="createBlog">Create your blog</a>
            </li>
          ) : (
            <li>
              <a href="blog">Visit your blog</a>
            </li>
          )
        ) : (
          <></>
        )}

        <li>
          <a href="blogs">See all blogs</a>
        </li>
        <li>
          <a href="login">Log in</a>
        </li>
        <li>
          <a href="signup">Sign up</a>
        </li>
        <li>
          <a onClick={handleLogOut}>Log out</a>
        </li>
      </ul>
    </>
  );
}
export default App;
