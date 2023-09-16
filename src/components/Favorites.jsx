//Dependencies
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
//Config
import apiConfig from '../apiConfig';
//Commons
import FavoriteCards from '../views/FavoritesCards';

const Favs = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const userData = useSelector((state) => state.user);
  const { projectBaseUrl } = apiConfig;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favsInfo = await axios.get(
          `${projectBaseUrl}/favorites/${userData.user_name}`,
          {
            withCredentials: true,
          }
        );
        console.log('fav data : ', favsInfo.data);
        setFavoriteMovies(favsInfo.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log('soy favorite movie : ', favoriteMovies);
    fetchFavorites();
  }, []);

  return (
    <div className="max-w-screen-lg p-12 mx-auto flex flex-col justify-center w-full h-full">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12  sm:px-0 ">
        {favoriteMovies.map((value) => (
          <div>
            <FavoriteCards key={value.id} {...value} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favs;
