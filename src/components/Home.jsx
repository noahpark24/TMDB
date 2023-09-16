//Dependencies
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
//Config
import apiConfig from '../apiConfig';
//Hooks
import useInput from '../hooks/useInput';
//Views
import Populars from '../views/Populars';

const Home = ({ movies }) => {
  const [searched, setSearched] = useState([]);
  const search = useInput();
  const navigate = useNavigate();
  const { baseUrl, apiKey, w500Image } = apiConfig;

  const user = useSelector((state) => state.user);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      let query = search.value.replace(' ', '%20');
      let searchedMovies = await axios.get(
        ` ${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=1&include_adult=false`
      );
      setSearched(searchedMovies.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          {...search}
          className="input my-3"
          type="text"
          placeholder="Search movie"
        />
      </form>
      <button onClick={() => setSearched([])}>Home</button>
      <div>
        {searched.length > 0 ? (
          <>
            {searched.map((data) => (
              <div key={data.id}>
                <h1>{data.title}</h1>
                <img src={w500Image(data.poster_path)} alt="movie_image"></img>
                <button onClick={() => navigate(`/movieinfo/${data.id}`)}>
                  view more
                </button>
              </div>
            ))}
          </>
        ) : (
          <>
            {movies.map((value) => (
              <>
                <Populars key={value.id} {...value} />
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Home;
