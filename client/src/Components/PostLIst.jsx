import { useQuery } from "@tanstack/react-query";
import CommentCreate from "./CommentCreate";
import { CommentList } from "./CommentList";

export default function PostsList() {
  const query = useQuery({
    queryKey: "posts",
    queryFn: async () => {
      const response = await fetch(`http://localhost:4002/posts`);
      return response.json();
    },
  });

  if (query.isLoading) return <div>Loading...</div>;

  if (query.error) return <div>Error: {query.error.message}</div>;

  return (
    <div>
      <h1>Posts List</h1>

      <div className="d-flex flex-wrap gap-3" style={{ margin: "10px" }}>
        {query.data.map((post) => (
          <div
            key={post.id}
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
          >
            <div className="card-body">
              <h3>{post.title}</h3>

              <h2>Comments</h2>
              <hr />

              <CommentList comments={post.comments} />
              {/* todo handle the comments */}
              <CommentCreate postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
