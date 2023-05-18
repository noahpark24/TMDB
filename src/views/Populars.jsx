import apiConfig from "../apiConfig";
import { useNavigate } from "react-router-dom";

const Populars = ({ title, poster_path, id }) => {
  const { w500Image } = apiConfig;
  const navigate = useNavigate();

  const a = () => {
    navigate(`/movieinfo/${id}`);
  };

  return (
    <>
      <div>
        <h1>{title}</h1>
        <img src={w500Image(poster_path)} alt="movie_image"></img>
        <button onClick={a}>view more</button>
      </div>
    </>
  );
};

export default Populars;
