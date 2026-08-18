import { useParams, Link } from "react-router-dom";

function CityDetails({ cities }) {
  const { id } = useParams();

  const city = cities.find(
    (city) => city.id === Number(id)
  );

  if (!city) {
    return (
      <div>
        <h2>City Not Found</h2>
        <Link to="/cities">Back to Cities</Link>
      </div>
    );
  }

  return (
    <div className="city-details">
      <h2>{city.name}</h2>

      <p>
        <strong>Country:</strong> {city.country}
      </p>

      <p>
        <strong>Population:</strong> {city.population}
      </p>

      <p>
        <strong>Description:</strong> {city.description}
      </p>
    </div>
  );
}

export default CityDetails;