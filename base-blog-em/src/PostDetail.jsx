import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deletePostMutate, updatePostTitleMutate }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  let comments;
  if (isLoading) {
    comments = <li>Fetching comments...</li>;
  } else if (isError) {
    comments = (
      <li>
        <h3>Error fetching comments</h3>
        <p>{error}</p>
      </li>
    );
  } else {
    comments = data.map((comment) => (
      <li key={comment.id}>
        {comment.email}: {comment.body}
      </li>
    ));
  }
  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deletePostMutate.mutate(post.id)}>Delete</button>{" "}
        <button onClick={() => updatePostTitleMutate.mutate(post.id)}>Update title</button>
        {deletePostMutate.isPending && (
          <p className="loading">Deleting post...</p>
        )}
        {deletePostMutate.isError && (
          <p className="error">
            Error deleting post: {deletePostMutate.error.toString()}
          </p>
        )}
        {deletePostMutate.isSuccess && <p>Post was (not) deleted.</p>}
        {updatePostTitleMutate.isPending && (
          <p className="loading">Updating title...</p>
        )}
        {updatePostTitleMutate.isError && (
          <p className="error">
            Error updating title: {updatePostTitleMutate.error.toString()}
          </p>
        )}
        {updatePostTitleMutate.isSuccess && <p>Post title (not) updated.</p>}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      <ul>{comments}</ul>
    </>
  );
}
