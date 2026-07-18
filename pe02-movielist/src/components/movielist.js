import React, { useState } from "react";
import "./movielist.css";

function MovieList() {

  const movies = [
    { moviename: "Avatar", genre: "Action", yearofrelease: 2009 },
    { moviename: "Titanic", genre: "Romance", yearofrelease: 1997 },
    { moviename: "The Dark Knight", genre: "Action", yearofrelease: 2008 },
    { moviename: "Finding Nemo", genre: "Animation", yearofrelease: 2003 },
    { moviename: "Toy Story", genre: "Animation", yearofrelease: 1995 },
    { moviename: "The Notebook", genre: "Romance", yearofrelease: 2004 }
  ];

  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  const genres = [
    "All Genres",
    ...new Set(movies.map(movie => movie.genre))
  ];

  const filteredMovies =
    selectedGenre === "All Genres"
      ? movies
      : movies.filter(movie => movie.genre === selectedGenre);

  return (
    <div className="container">

      <h1>Movie List</h1>

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        {genres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <div className="movie-list">
        {filteredMovies.map((movie, index) => (
          <div
            key={index}
            className="movie-card"
            onClick={() => alert(movie.moviename)}
          >
            <h3>{movie.moviename}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Year of Release: {movie.yearofrelease}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MovieList;