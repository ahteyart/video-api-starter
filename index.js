const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const tasks = {};

app.post('/api/v1/videos', (req, res) => {
  const { video_subject, video_script } = req.body;
  if (!video_subject || !video_script) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const taskId = uuidv4();
  tasks[taskId] = { progress: 0, videos: [] };

  setTimeout(() => {
    tasks[taskId] = {
      progress: 100,
      videos: [`https://example.com/videos/${taskId}.mp4`]
    };
  }, 3000);

  res.json({ message: 'Video task created', task_id: taskId });
});

app.get('/api/v1/tasks/:taskId', (req, res) => {
  const task = tasks[req.params.taskId];
  return task ? res.json(task) : res.status(404).json({ message: 'Not found' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
