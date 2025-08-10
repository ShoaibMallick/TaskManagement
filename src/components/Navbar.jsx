import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-50 py-4 px-6 text-center shadow-sm border-b border-indigo-100 ">
      <h1 className="font-bold text-xl text-indigo-700 select-none tracking-tight inline-block">
        Task Management App
      </h1>
      <NavLink
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 float-right"
        to="/tasklist"
      >
        Task List
      </NavLink>
    </div>
  );
}

export default Navbar;
