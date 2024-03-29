//Dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//config
import apiConfig from '../apiConfig';
//Redux States
import { setFavorite } from '../state/favorite';
//Commons
import { AddToFavoriteMessage } from '../commons/alerts';

const MovieInfo = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { projectBaseUrl, baseUrl, apiKey, w500Image } = apiConfig;
  let { id } = useParams();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let movieDetails = await axios.get(
          `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
        );
        setMovieDetails(movieDetails.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleFavorite = async (e) => {
    try {
      e.preventDefault();
      const newMovie = {
        movie_name: movieDetails.title,
        movie_id: movieDetails.id,
        user_name: user.user_name,
        is_tv_show: false,
        poster_path: movieDetails.poster_path,
      };
      let addFavorite = await axios.post(
        `${projectBaseUrl}/favorites/add`,
        newMovie,
        {
          withCredentials: true,
        }
      );
      if (addFavorite.data.userId) dispatch(setFavorite(addFavorite.data));
      navigate('/Movies');
      AddToFavoriteMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const { title, poster_path, overview, genres, release_date, tagline } =
    movieDetails;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-7xl ">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-full w-full object-cover"
            src={w500Image(poster_path)}
            alt="movie_image"
          />
        </div>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <h4 className="text-xl mb-2">{release_date}</h4>
          {user.email && (
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleFavorite}
            >
              Add To Favs
            </button>
          )}
          <h4 className="text-xl mt-4">{tagline}</h4>
          <h4 className="text-xl mt-4">
            Genres : {genres?.map((data) => `${data.name}, `)}
          </h4>
          {overview && (
            <h3 className="text-lg mt-4">
              Summary:
              <br />
              {overview}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
