import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import apiConfig from "../apiConfig";
import { useNavigate, useParams } from "react-router-dom";
import { LogContext } from "../contexts/LogContext";
import { FavoritesContext } from "../contexts/FavoritesContext";

const TvShowsInfo = () => {
  const user = useContext(LogContext);
  const favs = useContext(FavoritesContext);
  const { baseUrl, apiKey, w500Image } = apiConfig;
  const [showDetails, setShowDetails] = useState([]);
  const navigate = useNavigate();

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
      email: user.email,
      poster_path: showDetails.poster_path,
    };

    axios
      .post("http://localhost:3000/api/favorites/add", newShow)
      .then((result) => {
        favs.addFavorite(result.data);
      })
      .then(() => {
        alert("Tv show added to Favs list");
        navigate("/movies");
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

export default TvShowsInfo;
