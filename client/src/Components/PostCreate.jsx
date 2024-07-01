import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => axios.post(`http://localhost:4000/posts`, { title }),
    onSuccess: () => {
      setTitle("");
      setTimeout(() => {
        client.invalidateQueries("posts");
      }, 300);
    },
  });

  return (
    <div className="container">
      <h2>PostCreate</h2>

      <form
        onSubmit={async (e) => {
          e.preventDefault();

          mutation.mutate();
          // const response = await axios.post("http://localhost:4000/posts", {
          //   title,
          // });

          // setTitle("");
          // console.log(response.data);
          // window.location.reload();
        }}
      >
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
