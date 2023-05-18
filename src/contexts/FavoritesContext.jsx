import { useState, createContext } from "react";

//EL CONTEXTO TENDRA UN USUARIO , VERIFICACION DE UN USUARIO Y UNA FUNCION
const defaultValue = {
  movie_name: "",
  movie_id: "",
  poster_path: "",
  // overview: "",
  // genres: "",
  // release_date: "",
  // tagline: "",
  addFavorite: () => null,
  deleteFavorite: () => null,
};

export const FavoritesContext = createContext(defaultValue);

const FavoritesContextProvider = ({ children }) => {
  const [favorite, setFavorite] = useState({
    movie_name: "",
    movie_id: "",
    poster_path: "",
    // overview: "",
    // genres: "",
    // release_date: "",
    // tagline: "",
  });

  const addFavorite = (movie) =>
    setFavorite({
      movie_name: movie.movie_name,
      movie_id: movie.movie_id,
      poster_path: movie.poster_path,
      // overview: movie.overview,
      // genres: movie.genres,
      // release_date: movie.release_date,
      // tagline: movie.tagline,
    });

  const deleteFavorite = () => {
    setFavorite({
      movie_name: "",
      movie_id: "",
      poster_path: "",
      // overview: "",
      // genres: "",
      // release_date: "",
      // tagline: "",
    });
  };
  return (
    <FavoritesContext.Provider
      value={{ ...favorite, addFavorite, deleteFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
