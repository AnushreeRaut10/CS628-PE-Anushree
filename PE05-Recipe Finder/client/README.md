README.md

# Input:
1. Recipe Finder allows users to input recipe details via a React form. 
2. Users enter a recipe name, category, cooking time, ingredients, and instructions.
3. Each ingredient is written on a separate line and turned into an array before the form is submitted.
4. Users can also add recipe links and choose to edit or delete a recipe.5. React Router gets the recipe ID from the URL using useParams.

# Process:
1. The React app sends HTTP requests to an Express server.
2. Express checks if the data is valid and uses the MongoDB Node.js driver to connect to MongoDB Atlas.
3. The POST method adds new recipes, GET retrieves existing ones, PATCH updates existing entries, and DELETE removes them.Each recipe is uniquely identified by a MongoDB ObjectId.
4. The nested route keeps the recipe list layout while showing the selected recipe details.

# Output:
1. The application shows a nicely styled list of recipes and detailed information for each one.
2. New or updated recipes appear right away in the interface, while deleted ones are no longer visible.
3. Error and loading messages keep users informed.
4. MongoDB Atlas saves all the recipes permanently, so the data stays available even after the app is refreshed.
