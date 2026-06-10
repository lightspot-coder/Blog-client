import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Deleteblog() {
  const { blogId } = useParams();
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const body = new FormData();
    fetch(`http://localhost:3000/blog-api/blogs/${blogId}`, {
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
        user.blogId = null;
        localStorage.setItem("user", JSON.stringify(user));
      });
  }, []);

  return (
    <>
      <h1>{user && user.name + " "}Delete blog page</h1>
      <p>{message}</p>
      <br />
      <a href="/">Go back to the home page</a>
    </>
  );
}

export default Deleteblog;
