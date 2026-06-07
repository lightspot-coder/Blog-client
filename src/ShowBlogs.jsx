import { useEffect, useState } from "react";

function Showblogs() {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:3000/blog-api/blogs")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBlogs(data);
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
        <h1>Blogs page</h1>
        <ul>
          {blogs.map((blog) => (
            <li>
              <p>
                <b>blog title : {blog.title}</b>
              </p>
              <p>creator : {blog.creator.name}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Showblogs;
