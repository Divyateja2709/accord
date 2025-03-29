import React, { useEffect, useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";
import useAppStore from "../store/store";

const ToggleDarkMode: React.FC = () => {
  const { backgroundColor, toggleDarkMode } = useAppStore();
  const [isDarkMode, setIsDarkMode] = useState(backgroundColor === "#121212");

  useEffect(() => {
    setIsDarkMode(backgroundColor === "#121212");
  }, [backgroundColor]);

  const handleChange = () => {
    toggleDarkMode();
    setIsDarkMode((prev) => !prev);
    const newTheme = !isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="flex justify-center items-center">
      <DarkModeToggle
        className="dark-mode-toggle"
        onChange={handleChange}
        checked={isDarkMode}
        size={60}
      />
    </div>
  );
};

export default ToggleDarkMode;
