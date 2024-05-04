import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Task from './Task';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'incomplete') {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className="p-4">
      <div className="mb-4">
        <label
          htmlFor="taskFilter"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Filter Tasks
        </label>
        <select
          id="taskFilter"
          className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="mb-4">
            <Task task={task} />
          </li>
        ))}
      </ul>
      <Link
        to="/add-task"
        className="w-full p-2 text-sm font-medium text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:focus:ring-blue-600"
      >
        Add Task
      </Link>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default TaskList;
