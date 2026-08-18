import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Cities</h1>

      <div className="nav-links">
        <Link to="/cities">Cities</Link>
        <Link to="/add-city">Add City</Link>
      </div>
    </nav>
  );
}

export default Navbar;