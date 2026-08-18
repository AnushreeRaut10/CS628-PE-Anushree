import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCity({ cities, setCities }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    population: "",
    description: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCity = {
      id: Date.now(),
      name: formData.name,
      country: formData.country,
      population: formData.population,
      description: formData.description
    };

    setCities([...cities, newCity]);

    navigate("/cities");
  };

  return (
    <div className="add-city">
      <h2>Add City</h2>

      <form onSubmit={handleSubmit}>
        <label>
          City Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Country
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Population
          <input
            type="text"
            name="population"
            value={formData.population}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">
          Add City
        </button>
      </form>
    </div>
  );
}

export default AddCity;