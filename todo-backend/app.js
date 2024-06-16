// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserRouter = require("./src/routes/user_routes");
const TaskRouter = require("./src/routes/task_routes");

// Create an instance of Express
const app = express();

// Middleware to parse request body
app.use(bodyParser.json());
app.use(cors());

app.use("/user", UserRouter);

app.use("/task", TaskRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
