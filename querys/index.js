import cors from "cors";
import express from "express";

const app = express();
app.use(express.json()).use(cors());

const posts = [];

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { data, type } = req.body;
  handleEvent(type, data);
  res.send({ status: "OK" });
});

function handleEvent(type, data) {
  switch (type) {
    case "PostCreated":
      posts.push({ ...data, comments: [] });
      console.log("PostCreated");
      break;
    case "CommentCreated":
      posts.find((post) => post.id === data.postId)?.comments.push({ ...data });
      break;
    case "CommentUpdated":
      const comment = posts
        .find((post) => post.id === data.postId)
        ?.comments.find((comment) => comment.id === data.id);

      Object.assign(comment, data);

      break;
    default:
      break;
  }
}

const PORT = Number(process.env.PORT) || 4002;
app.listen(PORT, () => {
  console.log("Listening on 4002");
});
