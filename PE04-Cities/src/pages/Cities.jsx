import { Outlet } from "react-router-dom";
import CityList from "../components/CityList";

function Cities({ cities }) {
  return (
    <div className="cities-page">
      <div className="cities-list-section">
        <h2>City List</h2>

        <CityList cities={cities} />
      </div>

      <div className="city-details-section">
        <Outlet />
      </div>
    </div>
  );
}

export default Cities;