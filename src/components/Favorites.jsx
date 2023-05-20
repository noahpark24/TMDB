import axios from "axios";
import apiConfig from "../apiConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "../state/favorite";

const Favs = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const userData = useSelector((state) => state.user);
  const { w500Image } = apiConfig;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`/api/favorites/${userData.user_name}`)
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
                .delete(`/api/favorites/remove/${movie.movie_name}`)
                .then((res) => dispatch(setFavorite(res.data)))
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
