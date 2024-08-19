import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { setTasks } from './redux/tasksSlice';
import store from './redux/store';

const App = () => {
  const [editTask, setEditTask] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Load tasks from local storage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    dispatch(setTasks(savedTasks));
  }, [dispatch]);

  useEffect(() => {
    // Save tasks to local storage
    const unsubscribe =store.subscribe(() => {
      const tasks = store.getState().tasks;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    return () => unsubscribe();
  }, []);

  const handleAddOrUpdateTask = (task) => {
    setEditTask(task);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  return (
    <>
    <div className='yes'> <h1>Task Management App</h1></div>
    <div className="app">
      <h1>To-Do List</h1>
      <TaskForm
        editTask={editTask}
        onCancel={handleCancelEdit}
      />
      <TaskList
        onEdit={handleAddOrUpdateTask}
      />
    </div>
    </>
  );
};

export default App;
