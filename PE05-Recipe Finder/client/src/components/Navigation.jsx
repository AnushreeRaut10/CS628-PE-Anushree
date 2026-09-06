import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <header className="site-header">
      <h1>Recipe Finder</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/recipes">Recipe List</NavLink>
        <NavLink to="/add">Add Recipe</NavLink>
      </nav>
    </header>
  );
}