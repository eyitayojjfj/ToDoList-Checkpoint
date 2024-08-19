import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';

const TaskForm = ({ editTask, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (editTask) {
      setName(editTask.name);
      setDescription(editTask.description);
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description) {
      alert('Please fill in both fields');
      return;
    }

    const task = { name, description, id: editTask ? editTask.id : Date.now(), completed: false };

    if (editTask) {
      dispatch(updateTask({ id: editTask.id, changes: task }));
    } else {
      dispatch(addTask(task));
    }

    setName('');
    setDescription('');
    if (onCancel) onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
      {editTask && <button type="button" onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default TaskForm;
