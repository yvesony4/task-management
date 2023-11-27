import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    assignee: {
      type: String,
      required: true,
    },
    selectedProject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    attachedFile: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
