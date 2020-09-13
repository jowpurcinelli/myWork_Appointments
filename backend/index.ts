const express = require("express");
const app = express();

app.get("/projects", (req, res) => {
  return res.json(["projeto1", "projeto2", "projeto3"]);
});

app.post("/projects", (req, res) => {
  return res.json(["projeto1", "projeto2", "projeto3", "projeto4"]);
});

app.put("/projects/:id", (req, res) => {
  return res.json(["projeto1", "projeto2", "projeto3", "projetoEdit4"]);
});

app.delete("/projects/:id", (req, res) => {
  return res.json(["projeto1", "projeto2", "projeto3"]);
});

app.listen(3333, () => console.log("Server started"));
