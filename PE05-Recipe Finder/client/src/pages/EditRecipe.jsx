import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    cookingTime: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Recipe not found.");
        }

        setForm({
          name: data.name,
          ingredients: data.ingredients.join("\n"),
          instructions: data.instructions,
          category: data.category || "",
          cookingTime: data.cookingTime || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const response = await fetch(`/api/recipes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        ingredients: form.ingredients
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Unable to update recipe.");
      return;
    }

    navigate(`/recipes/${id}`);
  }

  if (loading) return <p>Loading recipe...</p>;

  return (
    <section className="form-card">
      <p className="eyebrow">Update your collection</p>
      <h2>Edit Recipe</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Recipe name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Cooking time in minutes
          <input
            name="cookingTime"
            type="number"
            min="0"
            value={form.cookingTime}
            onChange={handleChange}
          />
        </label>

        <label>
          Ingredients — enter one per line
          <textarea
            name="ingredients"
            rows="7"
            value={form.ingredients}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Cooking instructions
          <textarea
            name="instructions"
            rows="8"
            value={form.instructions}
            onChange={handleChange}
            required
          />
        </label>

        <button className="button" type="submit">
          Update Recipe
        </button>
      </form>
    </section>
  );
}