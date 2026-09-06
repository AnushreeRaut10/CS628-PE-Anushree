import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  ingredients: "",
  instructions: "",
  category: "",
  cookingTime: "",
};

export default function AddRecipe() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const recipe = {
      ...form,
      ingredients: form.ingredients
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add recipe.");
      }

      navigate(`/recipes/${data._id}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="form-card">
      <p className="eyebrow">Create something delicious</p>
      <h2>Add Recipe</h2>

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
            placeholder="Breakfast, dinner, dessert..."
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
          Save Recipe
        </button>
      </form>
    </section>
  );
}