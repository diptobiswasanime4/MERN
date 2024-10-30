import express from "express";
import cors from "cors";
import { v4 } from "uuid";

const app = express();

const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];

app.get("/todos", async (req, res) => {
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { name, completed } = req.body;
  const newTodo = { Id: v4(), name, completed };
  todos.push(newTodo);
  res.json(todos);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.Id != id);
  res.json({ msg: "Todo deleted", success: true });
});

app.get("/health", async (req, res) => {
  res.json({ msg: "API health is ok ok", success: true });
});

app.listen(PORT, () => {
  console.log(`App running in PORT ${PORT}`);
});
