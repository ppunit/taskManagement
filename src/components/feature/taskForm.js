import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, updateTask, getTask } from '../../store/slices/taskSlice';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const TaskForm = () => {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const taskId = searchParams.get('taskId');
    const currentTask = useSelector((state) => state.tasks.currentTask);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [errors, setErrors] = useState({});


    useEffect(() => {
        if (taskId) {
            dispatch(getTask({ taskId }))
        }
    }, [taskId])

    useEffect(() => {
        if (currentTask) {
            setTitle(currentTask.title)
            setDescription(currentTask.description)
            setDueDate(currentTask.dueDate)
            setPriority(currentTask.priority)
        }
    }, [currentTask])



    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (title.trim().length === 0) {
            newErrors.title = 'Title is required';
        }

        if (dueDate.trim().length === 0) {
            newErrors.dueDate = 'Due date is required';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (taskId) {
            dispatch(updateTask({
                title,
                description,
                dueDate,
                priority,
                id: taskId
            }));
            toast.success('Task updated successfully!');
        }
        else {

            dispatch(
                addTask({
                    title,
                    description,
                    dueDate,
                    priority,
                })
            );
            toast.success('Task added successfully!');
        }
    };

    const handleChange = (type, val) => {
        setErrors({})
        switch (type) {
            case 'title': {
                setTitle(val)
                break;
            }
            case 'description': {
                setDescription(val)
                break;
            }
            case 'dueDate': {
                setDueDate(val)
                break;
            }
            case 'priority': {
                setPriority(val)
            }
            default:
                break;

        }
    }

    return (
        <div className='container m-4 mx-auto shadow-md bg-white' role='main'>
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
                        aria-label="Task Title"
                        aria-required="true"
                        aria-invalid={errors.title ? 'true' : 'false'}
                        className={`w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600 ${errors.title ? 'border-red-500' : ''
                            }`}
                        value={title}
                        onChange={(e) => handleChange('title', e.target.value)}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-500" role='alert'>{errors.title}</p>
                    )}
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
                        aria-label="Task Description"
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
                        value={description}
                        onChange={(e) => handleChange('description', e.target.value)}
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
                        aria-label="Task Due Date"
                        aria-required="true"
                        aria-invalid={errors.dueDate ? 'true' : 'false'}
                        className={`w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600 ${errors.dueDate ? 'border-red-500' : ''
                            }`}
                        value={dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                    />
                    {errors.dueDate && (
                        <p className="mt-1 text-sm text-red-500" role='alert'>{errors.dueDate}</p>
                    )}
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
                        aria-label="Task Priority"
                        className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
                        value={priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 text-sm font-medium text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 dark:bg-blue-600 dark:focus:ring-blue-600"
                    aria-label={taskId ? "Update task" : "Add Task"}
                >
                    {taskId ? "Update task" : "Add Task"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};



export default TaskForm;