import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//Config
import apiConfig from '../apiConfig';
import { useDispatch } from 'react-redux';
//Commons
import { DeleteFavoriteMessage } from '../commons/alerts';
//Redux States
import { setFavorite } from '../state/favorite';

const FavoriteCards = ({ movie_name, poster_path, movie_id, is_tv_show }) => {
  const { projectBaseUrl, w500Image } = apiConfig;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      let deletedFavorite = await axios.delete(
        `${projectBaseUrl}/favorites/remove/${movie_name}`,
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

  return (
    <>
      <div className="z-10">
        <div className="shadow-md shadow-red-800 rounded-lg relative">
          <img
            className="rounded-md hover:scale-75"
            src={w500Image(poster_path)}
            alt={movie_name}
          />
          {/* Hover Text */}
          {is_tv_show ? (
            <a href={`/showinfo/${movie_id}`}>
              <div className="bg-black bg-opacity-50 text-white absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p>{movie_name}</p>
              </div>
            </a>
          ) : (
            <a href={`/movieinfo/${movie_id}`}>
              <div className="bg-black bg-opacity-50 text-white absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                <p>{movie_name}</p>
              </div>
            </a>
          )}
        </div>
        <button onClick={handleDelete}>Delete Favorite</button>
      </div>
    </>
  );
};

export default FavoriteCards;
