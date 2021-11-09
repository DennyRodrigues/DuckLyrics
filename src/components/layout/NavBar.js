import "./NavBar.css";
import { Link } from "react-router-dom";
import DuckIcon from "../icon/DuckIcon";

function NavBar() {
  return (
    <div className="nav-container">
      <nav className="main-nav-bar">
      <Link to="/" replace className="Link Search">
          Search
        </Link>
        <Link to="/" replace className="Link title">
          <div className="titleContainer">
          <DuckIcon className="responsive-logo"/>
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
