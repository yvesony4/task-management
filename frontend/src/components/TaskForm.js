import { useState } from "react";
import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [attachedFile, setAttachedFile] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = {
      title,
      startDate,
      endDate,
      assignee,
      selectedProject,
      description,
      priority,
      attachedFile,
    };

    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setStartDate("");
      setEndDate("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create Task</h3>

      <label>Name:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Start Date:</label>
      <input
        type="text"
        onChange={(e) => setStartDate(e.target.value)}
        value={startDate}
        className={emptyFields.includes("startDate") ? "error" : ""}
      />
      <label>End Date</label>
      <input
        type="text"
        onChange={(e) => setEndDate(e.target.value)}
        value={endDate}
        className={emptyFields.includes("endDate") ? "error" : ""}
      />
      <label>Assignee</label>
      <input
        type="text"
        onChange={(e) => setAssignee(e.target.value)}
        value={assignee}
        className={emptyFields.includes("assignee") ? "error" : ""}
      />
      <label>Select Project</label>
      <input
        type="text"
        onChange={(e) => setSelectedProject(e.target.value)}
        value={selectedProject}
        className={emptyFields.includes("selectedProject") ? "error" : ""}
      />
      <label>Select Project</label>
      <input
        type="text"
        onChange={(e) => setSelectedProject(e.target.value)}
        value={selectedProject}
        className={emptyFields.includes("selectedProject") ? "error" : ""}
      />
      <label>Description</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />
      <label>Priority</label>
      <input
        type="text"
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className={emptyFields.includes("priority") ? "error" : ""}
      />
      <label>AttachFile</label>
      <input
        type="text"
        onChange={(e) => setAttachedFile(e.target.value)}
        value={attachedFile}
        className={emptyFields.includes("attachedFile") ? "error" : ""}
      />

      <button>Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
