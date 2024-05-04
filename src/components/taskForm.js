import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addTask } from '../features/tasks/tasksSlice';

const TaskForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask({ title, description, dueDate, priority }));
    onClose();
  };

  return (
    <form className="p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="taskTitle"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="taskDescription"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Task Description
        </label>
        <textarea
          id="taskDescription"
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="taskDueDate"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Task Due Date
        </label>
        <input
          type="date"
          id="taskDueDate"
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="taskPriority"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Task Priority
        </label>
        <select
          id="taskPriority"
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="">Select Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full p-2 text-sm font-medium text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:focus:ring-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

TaskForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TaskForm;
