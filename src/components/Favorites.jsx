import axios from "axios";
import apiConfig from "../apiConfig";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "../state/favorite";
import { DeleteFavoriteMessage } from "../commons/alerts";

const Favs = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const userData = useSelector((state) => state.user);
  const { w500Image } = apiConfig;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (movieName) => {
    try {
      let deletedFavorite = await axios.delete(
        `/api/favorites/remove/${movieName}`
      );
      dispatch(setFavorite(deletedFavorite.data));
      navigate("/movies");
      DeleteFavoriteMessage();
    } catch (error) {
      console.log("error from handle delete", error);
    }
  };

  useEffect(async () => {
    try {
      const favsInfo = await axios.get(`/api/favorites/${userData.user_name}`);
      setFavoriteMovies(favsInfo.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {favoriteMovies.map((movie) => (
        <>
          <h1>{movie.movie_name}</h1>
          <img src={w500Image(movie.poster_path)} alt="movie_image"></img>
          <button onClick={() => handleDelete(movie.movie_name)}>
            Delete Favorite
          </button>
        </>
      ))}
    </>
  );
};

export default Favs;
