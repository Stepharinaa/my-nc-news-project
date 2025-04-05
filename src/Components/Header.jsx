import { Link } from "react-router-dom";

import lightModeLogo from "../assets/light-mailydail.png";
import darkModeLogo from "../assets/dark-mailydail.png";
import ThemeToggle from "./ThemeToggle";


function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <ThemeToggle setDarkMode={setDarkMode}/>
      
      <div className="logo-title">
      <Link to="/"><img 
      className="logo" 
      src={darkMode ? darkModeLogo : lightModeLogo} 
      alt="Maily Dail Logo" />
      </Link>
      </div>
      
      <nav className="navigation-links">
      <Link to="/articles">Articles</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
}

export default Header;