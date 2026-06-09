import { useState } from "react";

function CreateBlog() {
  const [blogTitle, setBlogTitle] = useState(null);
  const [blogCreated, setBlogCreated] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  async function handleForm(e) {
    e.preventDefault();
    const body = new FormData();
    body.set("title", blogTitle);
    await fetch("http://localhost:3000/blog-api/blogs", {
      headers: {
        Authorization: "bearer " + user.token,
      },
      method: "POST",
      body: new URLSearchParams(body),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setBlogCreated(true);
      });
  }
  function handleInputTitle(e) {
    setBlogTitle(e.target.value);
  }

  return (
    <>
      <h1>Blog Client</h1>
      <h2>Create your blog</h2>
      {blogCreated ? (
        <p>{message}</p>
      ) : (
        <form>
          <label>
            Title :{" "}
            <input type="text" name="title" onChange={handleInputTitle} />
          </label>
          <button onClick={handleForm}>Create a blog</button>
        </form>
      )}
      <a href="/">go back home</a>
    </>
  );
}

export default CreateBlog;
