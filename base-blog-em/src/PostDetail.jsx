import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  // replace with useQuery
  const {data, error, isLoading, isError} = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id)
  });

  let comments;
  if (isLoading) {
    comments = <li>Fetching comments...</li>;
  } else if (isError) {
    comments = <li><h3>Error fetching comments</h3><p>{error}</p></li>;
  } else {
    comments = data.map(comment => <li key={comment.id}>{comment.email}: {comment.body}</li>);
  }
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      <ul>
        {comments}
      </ul>
    </>
  );
}
