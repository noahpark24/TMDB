import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import apiConfig from "../apiConfig";

const Favs = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const { w500Image } = apiConfig;
  const navigate = useNavigate();
  const favorites = useContext(FavoritesContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/favorites")
      .then((res) => res.data)
      .then((favsInfo) => setFavoriteMovies(favsInfo));
  }, []);

  return (
    <>
      {favoriteMovies.map((movie) => (
        <>
          <h1>{movie.movie_name}</h1>
          <img src={w500Image(movie.poster_path)} alt="movie_image"></img>
          <button
            onClick={() =>
              axios
                .delete(
                  `http://localhost:3000/api/favorites/remove/${movie.movie_name}`
                )
                .then((res) => favorites.deleteFavorite(res.data))
                .then(() => {
                  alert("the movie has been removed succesfuly");
                  navigate("/movies");
                })
                .catch((err) => console.log("you broke this=>", err))
            }
          >
            Delete Favorite
          </button>
        </>
      ))}
    </>
  );
};

export default Favs;
