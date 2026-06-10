import { useState } from "react";

function CreateComment({ blogId, postId, setAddComment, setRefreshComments }) {
  const [commentMessage, setCommentMessage] = useState(null);
  const [message, setMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleForm(e) {
    e.preventDefault();
    const body = new FormData();
    body.set("message", commentMessage);
    await fetch(
      `http://localhost:3000/blog-api/blogs/${blogId}/posts/${postId}/comments`,
      {
        headers: {
          Authorization: "bearer " + user.token,
        },
        method: "POST",
        body: new URLSearchParams(body),
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setAddComment(false);
        setRefreshComments(Math.random());
      });
  }

  function handleInputComment(e) {
    setCommentMessage(e.target.value);
  }

  return (
    <>
      <form>
        <label>
          Comment :{" "}
          <input
            type="text"
            name="commentMessage"
            onChange={handleInputComment}
          />
        </label>
        <button onClick={handleForm}>submit</button>
      </form>
    </>
  );
}

export default CreateComment;
