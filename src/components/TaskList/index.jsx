import React, { useState } from "react";
import "./styles.css";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="component__TaskList">
      <h2>Task List</h2>
      {tasks?.length ? (
        <ul className="list">
          {tasks.map((task, index) => (
            <li
              key={generateKey(task.name + task.description)}
              className="item"
            >
              <span className="item-time">
                {`${Math.floor(task.time / 3600)
                  .toString()
                  .padStart(2, "0")}:${Math.floor((task.time % 3600) / 60)
                  .toString()
                  .padStart(2, "0")}:${(task.time % 60)
                  .toString()
                  .padStart(2, "0")}`}
              </span>
              <span className="item-title">{task.title}</span>
              <span className="item-description">{task.description}</span>
              <button type="button" onClick={onEdit(index)}>
                Edit
              </button>
              <button type="button" onClick={onDelete(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-item">No task is available</div>
      )}
    </div>
  );
};

export default TaskList;
