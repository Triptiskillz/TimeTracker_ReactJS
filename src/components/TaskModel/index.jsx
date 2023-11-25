import React from "react";
import "./styles.css";

function TaskModel(props) {
  const { handleCancel } = props;
  return (
    <div className="TaskModel">
      <TaskForm {...props} />
      <span className="underlay" onClick={handleCancel} />
    </div>
  );
}
export default TaskModel;

const TaskForm = ({ task, onChange, handleSubmit, handleCancel }) => {
  return (
    <form className="TaskForm" onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        required={true}
        value={task.title}
        placeholder="Title"
        onChange={onChange}
        title="Must enter task title"
      />
      <input
        type="text"
        required={true}
        name="description"
        onChange={onChange}
        value={task.description}
        placeholder="Description"
        title="Must enter task description"
      />
      <div className="btn-group">
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit">Save Task</button>
      </div>
    </form>
  );
};
