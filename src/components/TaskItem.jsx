import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskCompletion } from '../redux/tasksSlice';

const TaskItem = ({ task, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
  };

  const handleToggleComplete = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
      </div>
      <div>
        <button className='bn1' onClick={() => onEdit(task)}>Edit</button>
        <button className='bn2' onClick={handleDelete}>Delete</button>
        <button className='bn3' onClick={handleToggleComplete}>
          {task.completed ? 'Undo' : 'Complete'}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
