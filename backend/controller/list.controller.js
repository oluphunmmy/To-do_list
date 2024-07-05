const Todo = require('../models/ToDomodel.js');

// Create a new todo
const createTodos = async (req, res) => {
  try {
    const { task, description, deadline, status } = req.body;

    if (!task || !description || !deadline || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userId = req.user?.id;

    const todooData = { ...req.body, createdBy: userId }
    const todo = await Todo.create(todooData)
    // const todo = await Todo.create({ task, description, deadline, status });
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodos = async (req, res) => {
  try {
    const userId = req.user?.id;

    let query = {};
    if (userId) {
      query = { createdBy: userId };
    }
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized. Please login.' });
    }
    const todos = await Todo.find(query);
    res.status(200).json({ count: todos.length, data: todos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodos,
  getTodos,
  getTodo,
  updateToDo,
  deleteToDo
};
