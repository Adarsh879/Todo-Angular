const express = require("express");
const { verifyToken } = require("../utils/token");
const {
  findAllTasks,
  createTask,
  deleteTask,
  markTaskAsCompleted,
} = require("../dbservice");
const router = express.Router();

router.use(verifyToken);

router.get("/getTasks", async (req, res) => {
  const { email } = req.user;
  const tasks = await findAllTasks(email);

  res.json(tasks);
});

router.post("/addTask", async (req, res) => {
  const { email } = req.user;
  const { task } = req.body;
  console.log("Task:", task, "Email:", email);
  const newTask = await createTask(task, email);
  console.log(newTask);
  res.json(newTask);
});

router.delete("/deleteTask/:taskId", async (req, res) => {
  const id = req.params.taskId;
  console.log("Id:", id);
  const deletedTask = await deleteTask(id);
  if (deletedTask) {
    res.status(200).json({ message: "success" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

router.put("/markTaskAsDone/:taskId", async (req, res) => {
  const id = req.params.taskId;
  console.log("Id:", id);
  const updatedTask = await markTaskAsCompleted(id);
  if (updatedTask) {
    res.status(200).json({ message: "success", task: updatedTask });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

module.exports = router;
