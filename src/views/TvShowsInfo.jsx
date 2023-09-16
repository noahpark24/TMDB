//Dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Redux States
import { setFavorite } from '../state/favorite';
//Config
import apiConfig from '../apiConfig';
//Commons
import { AddToFavoriteMessage } from '../commons/alerts';

const TvShowsInfo = () => {
  const [showDetails, setShowDetails] = useState([]);
  const user = useSelector((state) => state.user);
  const { projectBaseUrl, baseUrl, apiKey, w500Image } = apiConfig;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();
  useEffect(() => {
    axios
      .get(` ${baseUrl}/tv/${id}?api_key=${apiKey}&language=en-US`)
      .then((res) => res.data)
      .then((data) => setShowDetails(data));
  }, []);

  const handleFavorite = (e) => {
    e.preventDefault();
    const newShow = {
      movie_name: showDetails.name,
      movie_id: showDetails.id,
      user_name: user.user_name,
      is_tv_show: true,
      poster_path: showDetails.poster_path,
    };

    axios
      .post(`${projectBaseUrl}/favorites/add`, newShow, {
        withCredentials: true,
      })
      .then((result) => {
        dispatch(setFavorite(result.data));
      })
      .then(() => {
        AddToFavoriteMessage();
        navigate('/movies');
      })
      .catch((err) => console.log(err));
  };

  const {
    name,
    poster_path,
    overview,
    genres,
    first_air_date,
    tagline,
    last_air_date,
  } = showDetails;
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
          <h1 className="text-2xl font-bold mb-4">{name}</h1>
          <h4 className="text-xl mb-2">Launched : {first_air_date}</h4>
          <h4 className="text-xl mb-2">FInished: {last_air_date}</h4>
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

export default TvShowsInfo;
