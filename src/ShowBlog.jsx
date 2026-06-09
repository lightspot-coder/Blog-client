import { useEffect, useState } from "react";

function Showblog() {
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    fetch(`http://localhost:3000/blog-api/blogs/${user.blogId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBlog(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <a href="/">Go back, something goes wrong</a>;
  } else {
    return (
      <>
        <h1>{user.name} Blog page</h1>
        <p>
          <b>title : {blog.title}</b>
        </p>
        <a href={`/blogs/${blog.id}/posts`}>Show your posts</a>
        <br></br>
        <a href="/">Go home page</a>
      </>
    );
  }
}

export default Showblog;
