import { Link, NavLink } from "react-router-dom";
import { FaLightbulb } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const steps = [
    { title: "Introduction", link: "/learn/intro" },
    { title: "Module 1", link: "/learn/module1" },
    { title: "Module 2", link: "/learn/module2" },
    { title: "Module 3", link: "/learn/module3" },
  ];

  return (
    <div className="w-64 h-full bg-gray-900 text-white p-6">
      <h2 className="text-lg font-semibold mb-4">Learning Pathway</h2>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index}>
            <NavLink
              to={step.link}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-gray-700 text-teal-300"
                    : "hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              {step.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <hr className="my-6 border-gray-700" />
      <div className="flex items-start bg-gray-800 p-4 rounded-lg shadow-md">
        <div className="mr-3 text-teal-400">
          <FaLightbulb className="text-2xl" />
        </div>
        <p className="text-sm text-gray-400">
          Welcome to the Learning Pathway! Use the sidebar to follow the guide.
          Open the{" "}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-300 underline"
          >
            Template Playground
          </Link>{" "}
          in another tab to experiment as you learn.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
