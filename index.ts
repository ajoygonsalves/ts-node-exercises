import express from "express";

const app = express();

const PORT = 3111;

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`);
});
