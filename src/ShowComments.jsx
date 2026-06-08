import { FetchData } from "./ShowPost";

function ShowComment({ url }) {
  const { data, error, loading } = FetchData(url);
  console.log(data);
  if (loading) {
    return <p>Loading comments ...</p>;
  } else if (error) {
    return <p>Something goes wrong loading comments</p>;
  } else {
    return (
      <>
        <br></br>
        <p>
          <b>Comments:</b>
        </p>
        <ul>
          {data.map((comment) => {
            <li>
              <p>
                <b>Author : {comment.author.name}</b>
              </p>
              <p>Comments : {comment.message}</p>
            </li>;
          })}
        </ul>
      </>
    );
  }
}

export default ShowComment;
