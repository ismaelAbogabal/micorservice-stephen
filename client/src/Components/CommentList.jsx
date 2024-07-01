export function CommentList({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.status == "approved"
              ? comment.content
              : comment.status == "pending"
              ? "This comment is awaiting moderation"
              : "This comment has been rejected"}
          </li>
        ))}
      </ul>
    </div>
  );
}
