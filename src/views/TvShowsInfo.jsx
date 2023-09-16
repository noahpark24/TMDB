import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiConfig from '../apiConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFavorite } from '../state/favorite';

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
      poster_path: showDetails.poster_path,
    };

    axios
      .post(`${projectBaseUrl}/favorites/add`, newShow)
      .then((result) => {
        dispatch(setFavorite(result.data));
      })
      .then(() => {
        alert('Tv show added to Favs list');
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
    <div>
      <h1>{name}</h1>
      <h4>
        Launched in : {first_air_date} {<br></br>}
        Last Episode in : {last_air_date}
      </h4>
      <img src={w500Image(poster_path)} alt="TVshow_image"></img>
      {user.email ? <button onClick={handleFavorite}>Add To Favs</button> : ''}
      <h4>{tagline}</h4>
      <h4>
        Genres :
        {genres?.map((data) => {
          return `     ${data.name} ,`;
        })}
      </h4>
      {overview ? (
        <h3>
          Summary :{<br></br>}
          {overview}
        </h3>
      ) : (
        ''
      )}
    </div>
  );
};

export default TvShowsInfo;
