import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import apiConfig from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { LogContext } from "../contexts/LogContext";

const MovieInfo = () => {
  const [movieDetails, setMovieDetails] = useState([]);

  const { baseUrl, apiKey, w500Image } = apiConfig;
  let { id } = useParams();

  const favs = useContext(FavoritesContext);
  const user = useContext(LogContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`)
      .then((res) => res.data)
      .then((data) => setMovieDetails(data));
  }, []);

  const handleFavorite = (e) => {
    e.preventDefault();
    const newMovie = {
      movie_name: movieDetails.title,
      movie_id: movieDetails.id,
      user_name: user.user_name,
      poster_path: movieDetails.poster_path,
    };

    axios
      .post("http://localhost:3000/api/favorites/add", newMovie)
      .then((result) => {
        favs.addFavorite(result.data);
      })
      .then(() => {
        alert("movie added to Favs list");
        navigate("/movies");
      })
      .catch((err) => console.log(err));
  };

  const {
    original_title,
    poster_path,
    overview,
    genres,
    release_date,
    tagline,
  } = movieDetails;

  return (
    <div>
      <h1>{original_title}</h1> <h4>{release_date}</h4>
      <img src={w500Image(poster_path)} alt="movie_image"></img>
      <button onClick={handleFavorite}>Add To Favs</button>
      <h4>{tagline}</h4>
      <h4>
        Genres :
        {genres?.map((data) => {
          return " " + data.name + " " + ",";
        })}
      </h4>
      <h3>
        Summary :{<br></br>}
        {overview}
      </h3>
    </div>
  );
};

export default MovieInfo;
