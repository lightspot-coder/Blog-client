import { useState } from "react";
import { useLocation, useParams } from "react-router";

function Updatepost() {
  const { blogId, postId } = useParams();
  const location = useLocation();
  const [postTitle, setPostTitle] = useState(location.state.title);
  const [postText, setPostText] = useState(location.state.text);
  const [postPublic, setPostPublic] = useState(location.state.public);
  const [postUpdate, setPostUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleForm(e) {
    e.preventDefault();
    const body = new FormData();
    body.set("title", postTitle);
    body.set("text", postText);
    body.set("public", postPublic);
    await fetch(
      `http://localhost:3000/blog-api/blogs/${blogId}/posts/${postId}`,
      {
        headers: {
          Authorization: "bearer " + user.token,
        },
        method: "PUT",
        body: new URLSearchParams(body),
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setPostUpdate(true);
      });
  }
  function handleInputTitle(e) {
    setPostTitle(e.target.value);
  }
  function handleInputText(e) {
    setPostText(e.target.value);
  }
  function handleInputPublic(e) {
    setPostPublic(e.target.checked);
  }

  return (
    <>
      <h1>{user.name + " "}Blog Client</h1>
      <p>
        <b>Update your post</b>
      </p>
      {postUpdate ? (
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
          <label>
            Text :{" "}
            <input
              type="text"
              name="title"
              onChange={handleInputText}
              defaultValue={location.state.text}
            />
          </label>
          <label>
            Public :{" "}
            <input
              type="checkbox"
              name="public"
              onChange={handleInputPublic}
              checked={postPublic}
            />
          </label>
          <button onClick={handleForm}>Update your post</button>
        </form>
      )}
      <a href={`/blogs/${blogId}/posts/${postId}`}>Go back to the post</a>
      <br />
      <a href="/">go back home</a>
    </>
  );
}

export default Updatepost;
