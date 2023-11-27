import Task from "../models/taskModel.js";
import mongoose from "mongoose";

// get all tasks
const getTasks = async (req, res) => {
  const user_id = req.user._id;

  const tasks = await Task.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// get a single task
export const getTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// create new task
export const createTask = async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    assignee,
    selectedProject,
    description,
    priority,
    attachedFile,
  } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!startDate) {
    emptyFields.push("startDate");
  }
  if (!endDate) {
    emptyFields.push("endDate");
  }
  if (!assignee) {
    emptyFields.push("assignee");
  }
  if (!selectedProject) {
    emptyFields.push("selectedProject");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!priority) {
    emptyFields.push("priority");
  }
  if (!attachedFile) {
    emptyFields.push("attachedFile");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  // add the task to the database
  try {
    const user_id = req.user._id;
    const task = await Task.create({
      title,
      startDate,
      endDate,
      assignee,
      selectedProject,
      description,
      priority,
      attachedFile,
      user_id,
    });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res.status(200).json(task);
};

// update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such task" });
  }

  const task = await Task.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!task) {
    return res.status(400).json({ error: "No such task" });
  }

  res
    .status(200)
    .json({ responseCode: 200, responseMessage: "task updated successfully" });
};

export default getTasks;
