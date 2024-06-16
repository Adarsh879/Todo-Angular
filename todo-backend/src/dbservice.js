const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/todo-app");

// Define the user schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create the user model
const User = mongoose.model("User", userSchema);

// Function to create a new user
async function createUser(email, password) {
  const user = new User({
    email,
    password,
  });
  try {
    const newUser = await user.save();
    console.log("New user created:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error creating new user:", error);
  }
}

// Function to find a user by username and password
async function findUser(email, password) {
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      console.log("User found:", user);
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding user:", error);
  }
}

//functions to add and remove tasks
//task schema
const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
});

//create task model
const Task = mongoose.model("Task", taskSchema);

async function createTask(task, email) {
  const newTask = new Task({
    task,
    email,
  });
  try {
    const task = await newTask.save();
    console.log("New task created:", task);
    return task;
  } catch (error) {
    console.error("Error creating new task:", error);
  }
}

async function findAllTasks(email) {
  try {
    const tasks = await Task.find({ email });
    if (tasks) {
      console.log("Tasks found:", tasks);
      return tasks;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding tasks:", error);
  }
}

async function markTaskAsCompleted(_id) {
  try {
    const task = await Task.findById(_id);
    if (task) {
      task.completed = true;
      const updatedTask = await task.save();
      console.log("Task updated:", updatedTask);
      return updatedTask;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding task:", error);
  }
}

async function deleteTask(_id) {
  try {
    const deletedTask = await Task.findByIdAndDelete(_id);
    if (deletedTask) {
      console.log("Task deleted:", deletedTask);
      return deletedTask;
    } else {
      console.log("Task not found for deletion.");
      return null;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

module.exports = {
  createUser,
  findUser,
  createTask,
  findAllTasks,
  markTaskAsCompleted,
  deleteTask,
};
