import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggleTask, updateTask } from '../../store/slices/taskSlice';
import DeleteIcon from '../../assets/images/deleteIcon.svg';
import EditIcon from '../../assets/images/editIcon.svg';
import { Link } from 'react-router-dom';

const Task = ({ task }) => {
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleDeleteTask = () => {
        dispatch(deleteTask(task.id));
    };

    const handleToggleTask = () => {
        dispatch(toggleTask(task.id));
    };


    return (
        <tr className="border-b border-gray-200" key={task.id}>
            <td className="p-4 ">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={handleToggleTask}
                    aria-label="Toggle task completion"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
            </td>
            <td className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                <span aria-label="Task title">{task.title}</span>
            </td>
            <td className="ml-2 text-sm max-w-60 font-medium text-gray-900 dark:text-gray-300">
                <span aria-label="Task description">{task.description}</span>
            </td>
            <td className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                <span aria-label="Task priority">{task.priority}</span>
            </td>
            <td className="ml-auto">
                <Link to={`/add-task?taskId=${task.id}`}>
                    <button
                        // onClick={() => setIsEditing(true)}
                        aria-label="Edit task"
                        className="p-1 text-gray-600 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 dark:focus:ring-blue-600 mr-2"
                    >
                        <img src={EditIcon} className='w-4 h-4' alt='edit' />
                    </button>
                </Link>
                <button
                    onClick={handleDeleteTask}
                    aria-label="Delete task"
                    className="p-1 text-gray-600 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 dark:focus:ring-blue-600"
                >
                    <img src={DeleteIcon} className='w-4 h-4' alt='delete' />
                </button>
            </td>
        </tr>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        dueDate: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
};

export default Task;