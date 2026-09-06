import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Navigation from "./components/Navigation";
import AddRecipe from "./pages/AddRecipe";
import EditRecipe from "./pages/EditRecipe";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import RecipeLayout from "./pages/RecipeLayout";

function SelectRecipe() {
  return (
    <div className="empty-state">
      <h3>Select a recipe</h3>
      <p>Choose a recipe from the list to see all its details.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddRecipe />} />

          <Route path="/recipes" element={<RecipeLayout />}>
            <Route index element={<SelectRecipe />} />
            <Route path=":id" element={<RecipeDetails />} />
          </Route>

          <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}