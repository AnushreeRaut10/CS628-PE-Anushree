import { Link } from "react-router-dom";

function CityList({ cities }) {
  return (
    <div className="city-list">
      {cities.map((city) => (
        <Link
          key={city.id}
          to={`/cities/${city.id}`}
          className="city-card"
        >
          <h3>{city.name}</h3>
          <p>{city.country}</p>
        </Link>
      ))}
    </div>
  );
}

export default CityList;