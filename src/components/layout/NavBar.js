import "./NavBar.css";
import { Link } from "react-router-dom";
import DuckIcon from "../icon/DuckIcon";

function NavBar() {
  return (
    <div className="nav-container">
      <nav className="main-nav-bar">
        <Link to="/" replace className="Link Search">
          <span>Search</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="SearchIcon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </Link>
        <Link to="/" replace className="Link title">
          <div className="titleContainer">
            <DuckIcon className="responsive-logo" />
            Ducklyrics
          </div>
        </Link>
        <Link to="/about" className="Link About">
          About
        </Link>
      </nav>
    </div>
  );
}

export default NavBar;
