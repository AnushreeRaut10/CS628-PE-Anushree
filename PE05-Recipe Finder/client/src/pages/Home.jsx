import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">Find it. Cook it. Save it.</p>
      <h2>Welcome to Recipe Finder</h2>
      <p>
        Browse your recipe collection, review ingredients and instructions,
        or add a new favorite.
      </p>

      <div className="hero-actions">
        <Link className="button" to="/recipes">
          Browse Recipes
        </Link>

        <Link className="button secondary" to="/add">
          Add a Recipe
        </Link>
      </div>
    </section>
  );
}