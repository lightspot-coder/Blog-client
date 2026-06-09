import { useEffect, useState } from "react";

function DeleteComment({ blogId, postId, commentId, setLoadComments }) {
  const [message, setMessage] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  async function handleDeleteComment(e) {
    e.preventDefault();
    await fetch(
      `http://localhost:3000/blog-api/blogs/${blogId}/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: "bearer " + user.token,
        },
        method: "DELETE",
      },
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessage(data.message);
      });
    setLoadComments(false);
  }

  return (
    <>
      <button onClick={handleDeleteComment}>Delete comment</button>
    </>
  );
}

export default DeleteComment;
