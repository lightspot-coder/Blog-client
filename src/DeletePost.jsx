import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Deletepost() {
  const { blogId, postId } = useParams();
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const body = new FormData();
    fetch(`http://localhost:3000/blog-api/blogs/${blogId}/posts/${postId}`, {
      headers: {
        Authorization: "bearer " + user.token,
      },
      method: "DELETE",
      body: new URLSearchParams(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return (
    <>
      <h1>{user && user.name + " "}Delete post page</h1>
      <p>{message}</p>
      <br />
      <a href={`/blogs/${blogId}/posts`}>Go back to the blog page</a>
      <br />
      <a href="/">Go back to the home page</a>
    </>
  );
}

export default Deletepost;
