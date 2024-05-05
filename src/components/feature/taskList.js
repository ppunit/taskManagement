import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Task from './task';
import { sortTasks, filterTasks, searchTasks } from '../../store/slices/taskSlice';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const [sortBy, setSortBy] = useState('dueDate');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const sortedTasks = React.useMemo(() => {
        return sortTasks(tasks, sortBy, sortOrder);
    }, [tasks, sortBy, sortOrder]);

    const filteredTasks = React.useMemo(() => {
        return filterTasks(sortedTasks, filterStatus);
    }, [sortedTasks, filterStatus]);

    const searchedTasks = React.useMemo(() => {
        return searchTasks(filteredTasks, searchQuery);
    }, [filteredTasks, searchQuery]);

    return (
        <div className="p-4 m-4 mx-auto shadow-md bg-white" role="region" aria-label="Task list">
            <div className="mb-4 flex flex-wrap justify-start border-b-2">
                <div className="flex items-center mr-4 mb-2">
                    <label
                        htmlFor="sortBy"
                        className="block mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Sort by:
                    </label>
                    <select
                        id="sortBy"
                        aria-label="Sort by"
                        className="w-30 p-2 mr-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="dueDate">Due Date</option>
                        <option value="priority">Priority</option>
                        <option value="completed">Completion Status</option>
                    </select>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <label
                        htmlFor="sortOrder"
                        className="block mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Sort order:
                    </label>
                    <select
                        id="sortOrder"
                        aria-label="Sort order"
                        className="w-30 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
                <div className="flex items-center mr-4 mb-2">
                    <label
                        htmlFor="filterStatus"
                        className="block mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Filter by:
                    </label>
                    <select
                        id="filterStatus"
                        aria-label="Filter by"
                        className="w-24 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>
                <div className="flex items-center mb-2">
                    <label
                        htmlFor="searchQuery"
                        className="block mr-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Search:
                    </label>
                    <input
                        type="text"
                        id="searchQuery"
                        aria-label="Search"
                        className="w-32 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-blue-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className={`overflow-x-auto w-full`} >
                <table
                    className={`w-full  border-collapse text-left min-w-[700px]`}
                    aria-label="Task list table"
                >
                    <thead>
                        <tr className=" bg-gray-100 border-b border-gray-200">
                            <th
                                scope="col"
                                className="ml-2  pt-4  pb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Mark as complete
                            </th>
                            <th
                                scope="col"
                                className="ml-2  pt-4  pb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Name
                            </th>
                            <th
                                scope="col"
                                className="ml-2  pt-4  pb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Summary
                            </th>
                            <th
                                scope="col"
                                className="ml-2  pt-4  pb-4 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Priority
                            </th>
                            <th
                                scope="col"
                                className="ml-auto"
                            >
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchedTasks.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                            />
                        ))}
                        {!searchedTasks.length && <tr>
                            <td colSpan="5">No tasks available</td>
                        </tr>}
                    </tbody>
                </table>
            </div>
            <div className='mt-4'>
                <Link
                    to="/add-task"
                    className="w-full p-2 text-sm font-medium text-white bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 dark:bg-blue-600 dark:focus:ring-blue-600"
                    aria-label="Add Task"
                >
                    Add Task
                </Link>
            </div>
        </div>
    );
};

export default TaskList;