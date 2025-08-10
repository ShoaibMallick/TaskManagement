import { useState, useEffect } from "react";
import { AiOutlineClose } from 'react-icons/ai';

export default function AddTaskModal({ show, onClose, onSubmit, initialValues }) {
   const [form, setForm] = useState({
        projectName: "",
        projectDescription: "",
        priority: "Low",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        if (initialValues) {
            setForm(initialValues);
        } else {
            setForm({
                projectName: "",
                projectDescription: "",
                priority: "Low",
                startDate: "",
                endDate: ""
            });
        }
    }, [initialValues, show]);

    if (!show) return null;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            projectName: "",
            projectDescription: "",
            priority: "Low",
            startDate: "",
            endDate: ""
        });
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm transition-colors duration-300"
            onClick={onClose} // click outside closes modal
        >
            <div
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg relative transform transition-all duration-300 scale-95 hover:scale-100"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition cursor-pointer"
                    onClick={onClose}
                >
                    <AiOutlineClose size={20} />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                    Add New Task
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                            Project Name
                        </label>
                        <input
                            type="text"
                            name="projectName"
                            value={form.projectName}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                            Project Description
                        </label>
                        <textarea
                            name="projectDescription"
                            value={form.projectDescription}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
                            rows={3}
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={form.startDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-semibold text-gray-700 dark:text-gray-200">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={form.endDate}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 transition"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition transform hover:scale-105"
                    >
                        {initialValues?"Update Task":"Add Task"}
                    </button>
                </form>
            </div>
        </div>

    );
}
