import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import apiConfig from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFavorite } from "../state/favorite";
import { AddToFavoriteMessage } from "../commons/alerts";

const MovieInfo = () => {
  const [movieDetails, setMovieDetails] = useState([]);
  const { baseUrl, apiKey, w500Image } = apiConfig;
  let { id } = useParams();

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    try {
      let movieDetails = await axios.get(
        `${baseUrl}/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      setMovieDetails(movieDetails.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFavorite = async (e) => {
    try {
      e.preventDefault();
      const newMovie = {
        movie_name: movieDetails.title,
        movie_id: movieDetails.id,
        user_name: user.user_name,
        poster_path: movieDetails.poster_path,
      };
      let addFavorite = await axios.post("/api/favorites/add", newMovie);
      if (addFavorite.data.userId) dispatch(setFavorite(addFavorite.data));
      navigate("/movies");
      AddToFavoriteMessage();
    } catch (error) {
      console.log(error);
    }
  };

  const { title, poster_path, overview, genres, release_date, tagline } =
    movieDetails;

  return (
    <div>
      <h1>{title}</h1> <h4>{release_date}</h4>
      <img src={w500Image(poster_path)} alt="movie_image"></img>
      {user.email ? <button onClick={handleFavorite}>Add To Favs</button> : ""}
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
        ""
      )}
    </div>
  );
};

export default MovieInfo;
