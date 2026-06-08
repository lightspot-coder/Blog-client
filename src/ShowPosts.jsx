import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Showposts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/blog-api/blogs/${blogId}/posts`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [blogId]);
  if (loading) return <p>Loading...</p>;
  if (error) {
    return <a href="/">Go back, something goes wrong</a>;
  } else {
    return (
      <>
        <h1>Posts page</h1>
        <ul>
          {posts.map((post) => (
            <li>
              <p>
                <b>post title : {post.title}</b>
              </p>
              <a href={`/blogs/${blogId}/posts/${post.id}`}>
                Go to the post info
              </a>
            </li>
          ))}
        </ul>
        <a href="/">Go back to the home page</a>
      </>
    );
  }
}

export default Showposts;
