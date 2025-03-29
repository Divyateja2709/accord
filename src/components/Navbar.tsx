import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useLocation, Link } from "react-router-dom";
import {
  FaGithub,
  FaQuestionCircle,
  FaUsers,
  FaInfoCircle,
  FaBook,
  FaCaretDown,
  FaBars,
} from "react-icons/fa";
import ToggleDarkMode from "./ToggleDarkMode";

interface NavbarProps {
  scrollToFooter: () => void;
}

function Navbar({ scrollToFooter }: NavbarProps) {
  const [hovered, setHovered] = useState<
    null | "home" | "explore" | "help" | "github" | "join"
  >(null);
  const location = useLocation();

  const props = useSpring({
    loop: true,
    from: { opacity: 0.5, boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" },
    to: [
      { opacity: 1, boxShadow: "0px 0px 5px rgba(255, 255, 255, 1)" },
      { opacity: 0.9, boxShadow: "0px 0px 0px rgba(255, 255, 255, 0)" },
    ],
    config: { duration: 1000 },
  });

  const isLearnPage = location.pathname.startsWith("/learn");

  return (
    <div className="bg-[#1b2540] h-16 flex items-center px-4 md:px-10 lg:px-16 justify-between">
      {/* Logo and Home Link */}
      <div
        className="flex items-center cursor-pointer"
        onMouseEnter={() => setHovered("home")}
        onMouseLeave={() => setHovered(null)}
      >
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/logo.png"
            alt="Template Playground"
            className="h-8 md:h-9"
          />
          <span className="hidden lg:block text-white text-lg font-semibold">
            Template Playground
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-6 text-white">
        <div
          className={`cursor-pointer ${
            hovered === "explore" ? "bg-gray-700 rounded-md" : ""
          } px-4 py-2`}
          onClick={scrollToFooter}
          onMouseEnter={() => setHovered("explore")}
          onMouseLeave={() => setHovered(null)}
        >
          Explore
        </div>

        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHovered("help")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="flex items-center space-x-1 px-4 py-2">
            <span>Help</span>
            <FaCaretDown className="text-sm" />
          </div>
          {hovered === "help" && (
            <div className="absolute bg-gray-800 shadow-lg rounded-md mt-2 w-48 z-10">
              <a
                href="https://github.com/accordproject/template-playground/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                <FaQuestionCircle className="mr-2 inline" /> About
              </a>
              <a
                href="https://discord.com/invite/Zm99SKhhtA"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                <FaUsers className="mr-2 inline" /> Community
              </a>
              <a
                href="https://github.com/accordproject/template-playground/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                <FaInfoCircle className="mr-2 inline" /> Issues
              </a>
              <a
                href="https://github.com/accordproject/template-engine/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                <FaBook className="mr-2 inline" /> Documentation
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-4">
        <ToggleDarkMode />
        {!isLearnPage && (
          <Link to="/learn/intro" className="learnNow-button">
            <animated.button
              style={props}
              className="bg-teal-500 text-[#050c40] px-5 py-2 rounded-md hover:bg-teal-400"
            >
              Learn
            </animated.button>
          </Link>
        )}
        <a
          href="https://github.com/accordproject/template-playground"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-white"
        >
          <FaGithub className="text-lg" />
          <span className="hidden md:inline">GitHub</span>
        </a>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button className="text-white focus:outline-none">
          <FaBars className="text-2xl" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
