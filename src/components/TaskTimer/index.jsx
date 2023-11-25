import React, { useState, useEffect, Fragment } from "react";
import TaskModel from "../TaskModel";
import TaskList from "../TaskList";
import "./styles.css";

const initialCurrentTask = {
  title: "",
  description: "",
};

function TaskTimer() {
  const [timer, setTimer] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [currentTask, setCurrentTask] = useState(initialCurrentTask);

  // Increament timer after it starts
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // Reset states after component unmount
  useEffect(() => {
    return () => {
      setTimer(0);
      setTasks([]);
      setIsPaused(false);
      setIsRunning(false);
      setShowModal(false);
      setEditingTask(null);
      setCurrentTask(initialCurrentTask);
    };
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleSave = () => {
    setShowModal(true);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleModalCancel = () => {
    setCurrentTask(initialCurrentTask);
    setEditingTask(null);
    setShowModal(false);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();

    if (editingTask !== null) {
      let newTasks = tasks;
      newTasks[editingTask] = currentTask;
      setTasks(newTasks);
    } else {
      setTasks([...tasks, { ...currentTask, time: timer }]);
    }
    setCurrentTask(initialCurrentTask);
    setEditingTask(null);
    setShowModal(false);
    setTimer(0);
  };

  const handleTaskEdit = (idx) => (e) => {
    setShowModal(true);
    setEditingTask(idx);
    setCurrentTask(tasks[idx]);
  };

  const handleTaskDelete = (idx) => (e) => {
    setTasks((prev) => prev.filter((_, i) => i != idx));
  };

  const handleFormChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCurrentTask({
      ...currentTask,
      [name]: value,
    });
  };

  return (
    <Fragment>
      {showModal && (
        <TaskModel
          task={currentTask}
          onChange={handleFormChange}
          handleSubmit={handleSaveTask}
          handleCancel={handleModalCancel}
          isEditing={editingTask !== null}
        />
      )}
      <div className="component__TaskTimer">
        <div className="clock-box">
          <p>{`${Math.floor(timer / 3600)
            .toString()
            .padStart(2, "0")}:${Math.floor((timer % 3600) / 60)
            .toString()
            .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`}</p>
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="start-btn"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            type="button"
            className="pause-btn"
            onClick={handlePause}
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            type="button"
            className="save-btn"
            onClick={handleSave}
            disabled={!isRunning && !isPaused}
          >
            Save
          </button>
        </div>
      </div>
      <TaskList
        tasks={tasks}
        onEdit={handleTaskEdit}
        onDelete={handleTaskDelete}
      />
    </Fragment>
  );
}

export default TaskTimer;
