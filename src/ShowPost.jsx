import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ShowComment from "./ShowComments";

export function FetchData(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [url]);
  return { data, error, loading };
}

function Showpost() {
  const { blogId, postId } = useParams();
  const url = `http://localhost:3000/blog-api/blogs/${blogId}/posts/${postId}`;
  const { data, error, loading } = FetchData(url);
  const [loadComments, setLoadComments] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  function handleClick(e) {
    e.preventDefault();
    setLoadComments(true);
  }
  if (loading) return <p>Loading...</p>;
  if (error) {
    return <a href="/">Go back, something goes wrong</a>;
  } else {
    return (
      <>
        <h1>{user && user.blogId == blogId && user.name + " "}Post page</h1>
        <p>
          <b>Title: {data.title}</b>
        </p>
        <p>text : {data.text}</p>
        <p>public : {data.public == true ? "true" : "false"}</p>
        <p>create at : {data.createdAt}</p>
        <br />
        {user && user.blogId == blogId && (
          <>
            <a href={`/blogs/${blogId}/posts/${postId}/update`}>Update post</a>
            <br />
            <a href={`/blogs/${blogId}/posts/${postId}/delete`}>Delete post</a>
          </>
        )}
        <br />
        <br />

        <a href={`/blogs/${blogId}/posts`}>Go back to the blog</a>
        <br />
        <a href="/">Go back to the home page</a>
        <br />
        <br />
        {loadComments ? (
          <ShowComment
            url={url + "/comments"}
            blogId={blogId}
            postId={postId}
            setLoadComments={setLoadComments}
          />
        ) : (
          <button onClick={handleClick}>Load comments</button>
        )}
      </>
    );
  }
}

export default Showpost;
