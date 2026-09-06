import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "./RecipeLayout";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loadRecipes } = useRecipes();

  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        setError("");

        const response = await fetch(`/api/recipes/${id}`);

        if (!response.ok) {
          throw new Error("Recipe not found.");
        }

        setRecipe(await response.json());
      } catch (err) {
        setError(err.message);
      }
    }

    loadRecipe();
  }, [id]);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/recipes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError("The recipe could not be deleted.");
      return;
    }

    await loadRecipes();
    navigate("/recipes");
  }

  if (error) return <p className="error">{error}</p>;
  if (!recipe) return <p>Loading recipe details...</p>;

  return (
    <article className="recipe-details">
      <p className="eyebrow">{recipe.category}</p>
      <h2>{recipe.name}</h2>

      <p>
        <strong>Cooking time:</strong>{" "}
        {recipe.cookingTime
          ? `${recipe.cookingTime} minutes`
          : "Not provided"}
      </p>

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={`${ingredient}-${index}`}>{ingredient}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p className="instructions">{recipe.instructions}</p>

      <div className="actions">
        <Link className="button secondary" to={`/recipes/${id}/edit`}>
          Edit
        </Link>

        <button className="button danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}