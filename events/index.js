import axios from "axios";
import express from "express";

const app = express();
app.use(express.json());

const events = [];

app.get("/events", (req, res) => res.json(events));

app.post("/events", (req, res) => {
  const event = req.body;
  res.send({ status: "OK" });

  events.push(event);

  setImmediate(() => {
    axios
      .post("http://myapp_querys:4002/events", event)
      .catch((e) => console.error("cant send to querys"));
    axios
      .post("http://myapp_posts:4000/events", event)
      .catch((e) => console.error("cant send to posts"));
    axios
      .post("http://myapp_comments:4001/events", event)
      .catch((e) => console.error("cant send to comments"));

    axios
      .post("http://myapp_moderations:4003/events", event)
      .catch((e) => console.error("cant send to moderations"));
  });
});

const PORT = Number(process.env.PORT) || 4999;
app.listen(PORT, () => {
  console.log("Listening on 4999");
});
