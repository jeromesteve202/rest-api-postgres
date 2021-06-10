const express = require('express');
const app = express();
const pool = require("./db");

app.use(express.json()); // gives access to req.body

// --- Routes ---

// get all todo
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err.messsage);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    res.json(todo.rows[0]);

  } catch (err) {
    console.log(err.message);
  }
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const text = 'INSERT INTO todo(description) VALUES($1) RETURNING *';
    const values = [description];

    const newTodo = await pool.query(text, values);
    res.json(newTodo.rows[0]);
    
  } catch (err) {
    console.error(err.messsage);
  }
});

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; // WHERE
    const { description } =req.body; //SET

    const newTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    res.json("Todo was updated");
    
  } catch (err) {
    console.error(err.messsage);
  }
});

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params; 

    const newTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was successfully deleted.");
    
  } catch (err) {
    console.error(err.messsage);
  }
});

app.listen(3000, () => {
  console.log('listening on port 3000')
});