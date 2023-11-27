import { useTasksContext } from "../hooks/useTasksContext";
import { useAuthContext } from "../hooks/useAuthContext";

import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TasksDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/api/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <div className="task-details">
      <h4>{task.title}</h4>
      <p>
        <strong>Start Date: </strong>
        {task.startDate}
      </p>
      <p>
        <strong>End Date </strong>
        {task.endDate}
      </p>
      <p>
        <strong>Assignee </strong>
        {task.assignee}
      </p>
      <p>
        <strong>Selected Project </strong>
        {task.selectedProject}
      </p>
      <p>
        <strong>Description </strong>
        {task.description}
      </p>
      <p>
        <strong>Priority </strong>
        {task.priority}
      </p>
      <p>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default TasksDetails;
