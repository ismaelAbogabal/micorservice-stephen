import axios from "axios";
import cors from "cors";
import { randomBytes } from "crypto";
import express from "express";

const app = express();
app.use(express.json()).use(cors());

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(comments[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { id } = req.params;
  const { content } = req.body;

  comments[id] ||= [];

  const comment = {
    id: commentId,
    postId: id,
    content,
    status: "pending",
  };

  axios.post("http://myapp_events:4999/events", {
    type: "CommentCreated",
    data: comment,
  });

  comments[id].push(comment);

  res.status(201).send(comment);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type == "CommentModerated") {
    const oldComment = comments[data.postId].find(
      (comment) => comment.id === data.id
    );

    oldComment.status = data.status;

    axios.post("http://myapp_events:4999/events", {
      type: "CommentUpdated",
      data: oldComment,
    });
  }

  res.send({ status: "OK" });
});

const PORT = Number(process.env.PORT) || 4001;
app.listen(PORT, () => {
  console.log("Listening on 4001");
});
