import axios from "axios";
import cors from "cors";
import { randomBytes } from "crypto";
import express from "express";

const app = express();
app.use(express.json()).use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(Object.values(posts));
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };

  await axios.post("http://myapp_events:4999/events", {
    type: "PostCreated",
    data: posts[id],
  });

  res.status(201).send(posts[id]);
});

app.get("/posts/:id", (req, res) => {
  res.send(posts[req.params.id]);
});

app.post("/events", (req, res) => {
  res.send({ status: "OK" });
});

const PORT = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log("Listening on 4000");
});
