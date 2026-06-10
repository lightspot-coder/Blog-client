import { useState } from "react";
import { useLocation } from "react-router";

function Updateblog() {
  console.log("here");
  const location = useLocation();
  const [blogTitle, setBlogTitle] = useState(location.state.title);
  const [blogUpdate, setBlogUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleForm(e) {
    e.preventDefault();
    const body = new FormData();
    body.set("title", blogTitle);
    await fetch(`http://localhost:3000/blog-api/blogs/${user.blogId}`, {
      headers: {
        Authorization: "bearer " + user.token,
      },
      method: "PUT",
      body: new URLSearchParams(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setBlogUpdate(true);
      });
  }
  function handleInputTitle(e) {
    setBlogTitle(e.target.value);
  }

  return (
    <>
      <h1>{user.name + " "}Update blog page</h1>
      {blogUpdate ? (
        <>
          <p>{message}</p>
          <br />
        </>
      ) : (
        <form>
          <label>
            Title :{" "}
            <input
              type="text"
              name="title"
              onChange={handleInputTitle}
              defaultValue={location.state.title}
            />
          </label>
          <button onClick={handleForm}>Update your post</button>
        </form>
      )}
      <a href="/">go back home</a>
    </>
  );
}

export default Updateblog;
