import axios from 'axios';
import apiConfig from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite } from '../state/favorite';
import { DeleteFavoriteMessage } from '../commons/alerts';

const Favs = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const userData = useSelector((state) => state.user);
  const { w500Image, projectBaseUrl } = apiConfig;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (movieName) => {
    try {
      let deletedFavorite = await axios.delete(
        `${projectBaseUrl}/favorites/remove/${movieName}`,
        {
          withCredentials: true,
        }
      );
      dispatch(setFavorite(deletedFavorite.data));
      navigate('/Movies');
      DeleteFavoriteMessage();
    } catch (error) {
      console.log('error from handle delete', error);
    }
  };

  useEffect(async () => {
    try {
      const favsInfo = await axios.get(
        `${projectBaseUrl}/favorites/${userData.user_name}`,
        {
          withCredentials: true,
        }
      );
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
