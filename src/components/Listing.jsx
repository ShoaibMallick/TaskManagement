import { useState } from "react";
import { NavLink } from "react-router-dom";
import projects from "../data/project";
import moment from "moment";
import AddTaskModal from "./addTaskModal";
import { PiNotePencilLight } from 'react-icons/pi';

export default function Listing() {
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const totalPages = Math.ceil(projects.length / itemsPerPage);

  // Slice projects for current page
  const currentProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Open modal for edit and fill values
  const handleEdit = (project) => {
    setEditTask({
      projectName: project.projectName,
      projectDescription: project.projectDescription,
      priority: project.priority,
      startDate: project.projectDeadline, // You may want to split this if you have separate start/end
      endDate: project.projectDeadline
    });
    setShowModal(true);
  };

  // Open modal for add
  const handleAdd = () => {
    setEditTask(null);
    setShowModal(true);
  };

  return (
    <div className="flex justify-center m-4 bg-gray-100 dark:bg-gray-900">
      <div className="overflow-x-auto rounded-xl shadow-lg bg-white dark:bg-gray-900 p-6 w-full max-w-6xl">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right transition duration-300"
          onClick={handleAdd}
        >
          Add Task
        </button>

        <table className="min-w-full text-sm md:text-base text-left text-gray-700 dark:text-gray-300 border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-lg shadow-md">
              <th className="px-6 py-3 font-semibold uppercase tracking-wider rounded-tl-lg">
                Project Name
              </th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                Project Description
              </th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider">
                Project Date
              </th>
              <th className="px-6 py-3 font-semibold uppercase tracking-wider rounded-tr-lg">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map(
              (project, idx) => (
                <tr
                  key={project.projectName}
                  className={`transition hover:bg-indigo-100 dark:hover:bg-gray-800 cursor-pointer ${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } rounded-lg`}
                  onClick={() =>
                    (window.location.href = `/projectdetails/${project.id}`)
                  }
                  style={{ transition: "background 0.2s" }}
                >
                  <td className="px-6 py-4 font-medium whitespace-nowrap">
                    {project.projectName}
                  </td>
                  <td className="px-6 py-4">{project.projectDescription}</td>
                  <td className="px-6 py-4">{project.priority}</td>
                  <td className="px-6 py-4">
                    {moment(project.projectDeadline).format("MMMM Do YYYY")}
                  </td>
                  <td className="px-6 py-4 items-center flex justify-center">
                    <button
                      type="button"
                      className="text-indigo-600 hover:text-indigo-900 dark:hover:text-indigo-400 font-semibold underline transition"
                      onClick={e => {
                        e.stopPropagation();
                        handleEdit(project);
                      }}
                    >
                      <PiNotePencilLight size={20}/>
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === 1
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-lg transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg transition ${
              currentPage === totalPages
                ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Next
          </button>
        </div>

        <AddTaskModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={() => setShowModal(false)}
          initialValues={editTask}
        />
      </div>
    </div>
  );
}
