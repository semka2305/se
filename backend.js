const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://localhost:27017/task-manager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Model zadania
const Task = mongoose.model('Task', {
  title: String,
  priority: Number,
  deadline: Date,
  completed: Boolean,
});

// Pobierz wszystkie zadania
app.get('/api/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Dodaj nowe zadanie
app.post('/api/tasks', async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Edytuj zadanie
app.put('/api/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedTask);
});

// Usuń zadanie