import React from "react";
import sun from "./Sun.svg";
import mon from "./Moon.svg";
import "./DarkMode.css";

const DarkMode = () => {
  const setDark = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };
  const setLight = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };
  const selectedTheme = localStorage.getItem("selectedTheme");
  if(selectedTheme === "dark"){
    setDark()
  }
//   setDark();
const toggleTheme = e => {
    if(e.target.checked) setDark();
    else setLight()
}
  return (
    <div className="dark_mode">
      <input className="dark_mode_input" type="checkbox" id="darkmode-toggle"
      onChange={toggleTheme} />
      <label className="dark_mode_label" for="darkmode-toggle">
        {/* <img src={sun} alt="" />
        <img src={mon} alt="" /> */}
      </label>
    </div>
  );
};

export default DarkMode;
