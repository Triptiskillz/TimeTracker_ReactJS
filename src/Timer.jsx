import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

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

  const handleModalSave = () => {
    setTasks([...tasks, { title, description, time: timer }]);
    setShowModal(false);
    setTitle('');
    setDescription('');
    setTimer(0);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div>
        <p>{`${Math.floor(timer / 3600)
          .toString()
          .padStart(2, '0')}:${Math.floor((timer % 3600) / 60)
          .toString()
          .padStart(2, '0')}:${(timer % 60).toString().padStart(2, '0')}`}</p>
      </div>
      <div>
        <button onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button onClick={handleSave} disabled={!isRunning && !isPaused}>
          Save
        </button>
      </div>
      {showModal && (
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleModalSave}>Save</button>
          <button onClick={handleModalCancel}>Cancel</button>
        </div>
      )}
      <div>
        <h2>Task List</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.title} - {task.description} - {`${Math.floor(task.time / 3600)
                .toString()
                .padStart(2, '0')}:${Math.floor((task.time % 3600) / 60)
                .toString()
                .padStart(2, '0')}:${(task.time % 60).toString().padStart(2, '0')}`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Timer;