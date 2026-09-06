import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";

export function useRecipes() {
  return useOutletContext();
}

export default function RecipeLayout() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/recipes");

      if (!response.ok) {
        throw new Error("Unable to load recipes.");
      }

      setRecipes(await response.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your collection</p>
          <h2>Recipe List</h2>
        </div>

        <Link className="button" to="/add">
          Add Recipe
        </Link>
      </div>

      <div className="recipe-layout">
        <aside className="recipe-sidebar">
          {loading && <p>Loading recipes...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && recipes.length === 0 && (
            <p>No recipes have been added.</p>
          )}

          {recipes.map((recipe) => (
            <Link
              className="recipe-link"
              key={recipe._id}
              to={`/recipes/${recipe._id}`}
            >
              <strong>{recipe.name}</strong>
              <span>{recipe.category}</span>
            </Link>
          ))}
        </aside>

        <div className="recipe-content">
          <Outlet context={{ recipes, loadRecipes }} />
        </div>
      </div>
    </section>
  );
}