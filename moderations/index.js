import axios from "axios";
import express from "express";

const app = express();
app.use(express.json());

app.post("/events", (req, res) => {
  switch (req.body.type) {
    case "PostCreated":
      break;
    case "CommentCreated":
      const { content } = req.body.data;

      if (content.includes("orange")) req.body.data.status = "rejected";
      else req.body.data.status = "approved";

      axios
        .post("http://myapp_events:4999/events", {
          type: "CommentModerated",
          data: req.body.data,
        })
        .catch((e) => {
          console.log("cant reach the event bus");
        });
      break;
    default:
      break;
  }

  res.send({ status: "OK" });
});

const PORT = Number(process.env.PORT) || 4003;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
