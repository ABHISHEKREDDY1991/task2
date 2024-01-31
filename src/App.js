import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      if (editIndex !== null) {
        // If in edit mode, update the task at editIndex
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = newTask;
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // If not in edit mode, add a new task
        setTasks([...tasks, newTask]);
      }

      setNewTask('');
    }
  };

  const handleEditTask = (index) => {
    // Set edit mode and populate the input with the task text
    setEditIndex(index);
    setNewTask(tasks[index]);
  };

  const handleDeleteTask = (index) => {
    // Exit edit mode if deleting the task being edited
    if (index === editIndex) {
      setEditIndex(null);
      setNewTask('');
    }

    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">My Todo App</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add a new task"
          value={newTask}
          onChange={handleInputChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handleAddTask}
          >
            {editIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {index === editIndex ? (
              <input
                type="text"
                className="form-control"
                value={newTask}
                onChange={handleInputChange}
              />
            ) : (
              task
            )}
            <div>
              {index === editIndex ? (
                <button
                  className="btn btn-outline-success btn-sm mr-2"
                  onClick={() => handleAddTask()}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-outline-info btn-sm mr-2"
                  onClick={() => handleEditTask(index)}
                >
                  Edit
                </button>
              )}
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
