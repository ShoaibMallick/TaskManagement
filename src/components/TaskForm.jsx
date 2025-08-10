import React, { useState, useRef, useEffect } from 'react';

function TaskForm() {
    const [task, setTask] = useState([])
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priorityOpen, setPriorityOpen] = useState(false);
    const [priority, setPriority] = useState('Select Priority');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const dropdownRef = useRef(null);
    useEffect(() => {
        console.log("Updated task:", task);
        if (task.length === 0) return;
        setTaskName('');
        setTaskDescription('');
        setPriority('Select Priority');
        setStartDate('');
        setEndDate('');
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setPriorityOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [task]);

    function handleSubmit(e) {
        e.preventDefault();
        setTask(prevTasks => [...prevTasks, {
            TaskName: taskName,
            TaskDescription: taskDescription,
            Priority: priority,
            StartDate: startDate,
            EndDate: endDate
        }])
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-50 via-white to-indigo-50 px-6 w-full'>
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 sm:p-10">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Create New Task</h2>

                    <div className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-semibold text-gray-800 mb-2">
                                Task Name
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter task name..."
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="about" className="block text-sm font-semibold text-gray-800 mb-2">
                                Task Description
                            </label>
                            <textarea
                                id="about"
                                name="about"
                                rows="4"
                                placeholder="Describe your task..."
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-200 resize-none"
                                required
                            ></textarea>
                        </div>

                        {/* Priority Dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <button
                                type="button"
                                onClick={() => setPriorityOpen(!priorityOpen)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                aria-haspopup="listbox"
                                aria-expanded={priorityOpen}
                            >
                                {priority}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {priorityOpen && (
                                <div className="z-10 absolute mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700">
                                    <ul
                                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                        role="listbox"
                                    >
                                        {['High', 'Medium', 'Low'].map((level) => (
                                            <li key={level}>
                                                <button
                                                    type="button"
                                                    className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    onClick={() => {
                                                        setPriority(level);
                                                        setPriorityOpen(false);
                                                    }}
                                                >
                                                    {level}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Date Range Picker */}
                        <div id="date-range-picker" className="flex items-center gap-3">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    id="datepicker-range-start"
                                    name="start"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date start"
                                />
                            </div>
                            <span className="text-gray-500">to</span>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                    </svg>
                                </div>
                                <input
                                    id="datepicker-range-end"
                                    name="end"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Select date end"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:text-indigo-700 transition"
                            onClick={() => {
                                setTaskName('');
                                setTaskDescription('');
                                setPriority('Select Priority');
                                setStartDate('');
                                setEndDate('');
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
