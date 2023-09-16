//Dependencies
import React from 'react';
import axios from 'axios';
import cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//Config
import apiConfig from '../apiConfig';
//Redux States
import { setUser } from '../state/user';
import { setSearchedTvShows } from '../state/tvshowSearchs';
import { setSearchedMovies } from '../state/movieSearchs';
//Hooks
import useInput from '../hooks/useInput';

const NavBar = () => {
  const { projectBaseUrl, baseUrl, apiKey } = apiConfig;

  const user = useSelector((state) => state.user);
  const search = useInput();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      let query = search.value.replace(' ', '%20');
      let searchedMovies = await axios.get(
        ` ${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&page=1&include_adult=false`
      );
      let searchedTvShows = await axios.get(
        `${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&page=1&query=${query}&include_adult=false`
      );

      dispatch(setSearchedMovies(searchedMovies.data.results));
      dispatch(setSearchedTvShows(searchedTvShows.data.results));
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await axios.post(`${projectBaseUrl}/users/logout`, {
        withCredentials: true,
      });
      cookies.remove('token');
      dispatch(setUser({}));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearSearch = () => {
    dispatch(setSearchedMovies([]));
    dispatch(setSearchedTvShows([]));
  };
  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-500 p-3 flex items-center justify-between mb-2 z-20">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/Movies">
          <span className="font-semibold text-xl ">TMDB</span>
        </Link>
      </div>
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center ml-32"
      >
        <input
          type="text"
          className="bg-white text-black rounded-full px-4 py-2 ml-2"
          placeholder="Search Movie or Tv show"
          {...search}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Search
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
          onClick={handleClearSearch}
        >
          Clear
        </button>
      </form>
      <div className="flex space-x-4">
        <Link
          to="/Movies"
          className="text-white hover:bg-blue-700 px-3 py-2 rounded"
        >
          Movies
        </Link>
        <Link
          to="/TV"
          className="text-white hover:bg-blue-700 px-3 py-2 rounded"
        >
          TV shows
        </Link>
        {user.email ? (
          <>
            <Link
              to="/favorites"
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
            >
              Favorites
            </Link>
            <button
              className="text-white hover:bg-blue-700 px-3 py-2 rounded"
              onClick={handleLogOut}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/users/login"
            className="text-white hover:bg-blue-700 px-3 py-2 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
