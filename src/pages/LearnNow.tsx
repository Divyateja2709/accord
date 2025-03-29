import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { steps } from "../constants/learningSteps/steps";

const LearnNow: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-1/4 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 overflow-y-auto">
        <Sidebar steps={steps} />
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 bg-white dark:bg-gray-800 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LearnNow;
