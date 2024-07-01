import axios from "axios";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentCreate({ postId }) {
  const [comment, setComment] = useState("");
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      axios.post("http://localhost:4001/posts/" + postId + "/comments", {
        content: comment,
      }),
    // mutationKey: ["comments", postId],
    onSuccess: () => {
      setComment("");
      setTimeout(() => {
        client.invalidateQueries(["posts"]);
      }, 300);
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          mutation.mutate();
        }}
      >
        <div className="form-group mb-3">
          <label>New Comment</label>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
