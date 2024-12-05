import React, { useState, useEffect } from "react";
import "./DarkMode.css";
import { FaMoon, FaSun } from "react-icons/fa";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set the initial theme based on localStorage
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      setIsDarkMode(true);
    } else {
      document.body.setAttribute("data-theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light mode
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("selectedTheme", "light");
      setIsDarkMode(false);
    } else {
      // Switch to dark mode
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("selectedTheme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="dark_mode">
      <button
        onClick={toggleTheme}
        className="text-lg mt-6 rounded-full transition text-yellow-500 dark:text-gray-300"
      >
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default DarkMode;