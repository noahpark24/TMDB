//Dependencies and functions
import axios from 'axios';
import { Route, Routes } from 'react-router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './state/user';
//Components
import NavBar from './components/NavBar';
import MovieCard from './components/MovieCard';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Favs from './components/Favorites';
import Tvdiscover from './components/TvDiscover';
//Views
import MovieInfo from './views/MovieInfo';
import TvShowsInfo from './views/TvShowsInfo';
//Config
import apiConfig from './apiConfig';

function App() {
  const [movie, setMovie] = useState([]);
  const [tvDiscover, setTvDiscover] = useState([]);
  const dispatch = useDispatch();
  const { projectBaseUrl, baseUrl, apiKey } = apiConfig;

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Getting Popular Movies
        const popularMovies = await axios.get(
          `${baseUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );
        setMovie(popularMovies.data.results);
      } catch (error) {
        console.error(error);
      }

      try {
        //Getting Popular Tv Shows
        const popularTvShows = await axios.get(
          `${baseUrl}/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
        );
        setTvDiscover(popularTvShows.data.results);
      } catch (error) {
        console.error(error);
      }

      try {
        //User session persistency
        const user = await axios.get(`${projectBaseUrl}/users/me`, {
          withCredentials: true,
        });
        dispatch(setUser(user.data));
      } catch (error) {
        console.error('no session detected');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/pruebas/:id" element={<MovieCard />} />
        <Route path="/Movies" element={<Home movies={movie} />} />
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/signup" element={<Register />} />
        <Route path="/movieinfo/:id" element={<MovieInfo />} />
        <Route path="/showinfo/:id" element={<TvShowsInfo />} />
        <Route path="/favorites" element={<Favs />} />
        <Route path="/TV" element={<Tvdiscover element={tvDiscover} />} />
      </Routes>
    </>
  );
}

export default App;
