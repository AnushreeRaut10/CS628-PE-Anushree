Input:
The app uses a set list of movie objects.Each movie has a title, a genre, and a release year.The user can pick a genre from a dropdown and click on a movie card to interact with the app.

The React app keeps track of the selected genre using the useState hook.
When the user chooses a different genre from the dropdown, the app filters the movie list using the filter() method.The unique genres are created using the Set object.When a user clicks on a movie card, an alert pops up showing the movie's title.The app is built using functional components, JSX, and CSS to keep things organized and visually appealing.

Output:
The app shows a list of movie cards with each movie's title, genre, and release year.
If a genre is selected, only the movies that match that genre appear.Clicking on a movie card brings up an alert with the movie's title.The app has a clean and easy-to-use interface for browsing and filtering movies.