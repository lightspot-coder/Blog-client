import { useState } from "react";

function CreatePost() {
  const [postTitle, setPostTitle] = useState(null);
  const [postText, setPostText] = useState(null);
  const [postCreated, setPostCreated] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleForm(e) {
    e.preventDefault();
    const body = new FormData();
    body.set("title", postTitle);
    body.set("text", postText);
    await fetch(`http://localhost:3000/blog-api/blogs/${user.blogId}/posts`, {
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
        setPostCreated(true);
      });
  }
  function handleInputTitle(e) {
    setPostTitle(e.target.value);
  }
  function handleInputText(e) {
    setPostText(e.target.value);
  }

  return (
    <>
      <h1>{user.name + " "}Blog Client</h1>
      <h2>Create your post</h2>
      {postCreated ? (
        <>
          <p>{message}</p>
          <a href={`/blogs/${user.blogId}/posts`}>Go back to the blog page</a>
          <br />
        </>
      ) : (
        <form>
          <label>
            Title :{" "}
            <input type="text" name="title" onChange={handleInputTitle} />
          </label>
          <label>
            Text : <input type="text" name="title" onChange={handleInputText} />
          </label>
          <button onClick={handleForm}>Create a new post</button>
        </form>
      )}
      <a href="/">go back home</a>
    </>
  );
}

export default CreatePost;
