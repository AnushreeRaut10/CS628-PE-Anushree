import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cities from "./pages/Cities";
import AddCity from "./pages/AddCity";
import CityDetails from "./components/CityDetails";

function App({ cities, setCities }) {
  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>

          <Route
            path="/cities"
            element={<Cities cities={cities} />}
          >
            <Route
              path=":id"
              element={<CityDetails cities={cities} />}
            />
          </Route>

          <Route
            path="/add-city"
            element={
              <AddCity
                cities={cities}
                setCities={setCities}
              />
            }
          />

          <Route
            path="/"
            element={<Navigate to="/cities" replace />}
          />

        </Routes>
      </main>
    </>
  );
}

export default App;