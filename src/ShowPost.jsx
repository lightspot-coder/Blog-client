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
        <h1>Post page</h1>
        <p>
          <b>Title: {data.title}</b>
        </p>
        <p>text : {data.text}</p>
        <p>public : {data.public == true ? "true" : "false"}</p>
        <p>create at : {data.createdAt}</p>
        {loadComments ? (
          <ShowComment url={url + "/comments"} />
        ) : (
          <button onClick={handleClick}>Load comments</button>
        )}

        <a href="/">Go home page</a>
      </>
    );
  }
}

export default Showpost;
