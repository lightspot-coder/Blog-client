import { useState } from "react";
import { FetchData } from "./ShowPost";
import CreateComment from "./CreateComment";
import DeleteComment from "./DeleteComment";

function ShowComment({ url, blogId, postId, setLoadComments }) {
  const { data, error, loading } = FetchData(url);
  const [addComment, setAddComment] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  function handleAddComment(e) {
    e.preventDefault();
    setAddComment(true);
  }

  if (loading) {
    return <p>Loading comments ...</p>;
  } else if (error) {
    return <p>Something goes wrong loading comments</p>;
  } else {
    console.log(data);
    return (
      <>
        <br></br>
        <p>
          <b>Comments:</b>
        </p>
        {data.length == 0 ? (
          <p>There are not comments in this post</p>
        ) : (
          <ul>
            {data.map((comment) => (
              <li>
                <p>
                  <b>Author : {comment.author.name}</b>
                </p>
                <p>Comments : {comment.message}</p>
                {user &&
                  (user.blogId == blogId ||
                    user.name == comment.author.name) && (
                    <DeleteComment
                      blogId={blogId}
                      postId={postId}
                      commentId={comment.id}
                      setLoadComments={setLoadComments}
                    />
                  )}
              </li>
            ))}
          </ul>
        )}
        {user &&
          (addComment ? (
            <CreateComment
              blogId={blogId}
              postId={postId}
              setAddComment={setAddComment}
              setLoadComments={setLoadComments}
            />
          ) : (
            <button onClick={handleAddComment}>Add a comment</button>
          ))}
      </>
    );
  }
}

export default ShowComment;
