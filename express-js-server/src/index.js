const express = require('express');
const app = express();

app.use(express.json());

// Migrated task list from python-server/src/main.py
const tasks = [
  "Write a diary entry from the future",
  "Create a time machine from a cardboard box",
  "Plan a trip to the dinosaurs",
  "Draw a futuristic city",
  "List items to bring on a time-travel adventure"
];

// Root route (matches Python server)
app.get('/', (req, res) => {
  res.send('Hello World');
});

// GET /tasks (migrated from python-server/src/main.py)
app.get('/tasks', (req, res) => {
  res.json({ tasks });
});

// POST /tasks (migrated from python-server/src/main.py)
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    return res.status(400).json({ message: 'Invalid task payload' });
  }
  tasks.push(text);
  res.json({ message: 'Task added successfully' });
});

// Listen on port 8001
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});