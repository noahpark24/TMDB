import React from 'react';
import { useNavigate } from 'react-router-dom';
//Config
import apiConfig from '../apiConfig';

const Populars = ({ title, poster_path, id }) => {
  const { w500Image } = apiConfig;
  const navigate = useNavigate();

  const goToMovieInfo = () => {
    navigate(`/movieinfo/${id}`);
  };

  return (
    <>
      <div>
        <h1>{title}</h1>
        <img src={w500Image(poster_path)} alt="movie_image"></img>
        <button onClick={goToMovieInfo}>view more</button>
      </div>
    </>
  );
};

export default Populars;
