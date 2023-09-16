import { useState } from 'react';
import apiConfig from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import axios from 'axios';

const Tvdiscover = ({ element }) => {
  const [searched, setSearched] = useState([]);
  const { baseUrl, apiKey, w500Image } = apiConfig;

  const search = useInput();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      let query = search.value.replace(' ', '%20');
      let searcheShow = await axios.get(
        `${baseUrl}/search/tv?api_key=${apiKey}&language=en-US&page=1&query=${query}&include_adult=false`
      );
      setSearched(searcheShow.data.results);
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
          placeholder="Search tv-show"
        />
      </form>
      <button onClick={() => setSearched([])}>Home</button>

      <div>
        {searched.length > 0 ? (
          <>
            {searched.map((data) => (
              <div key={data.id}>
                <h1>{data.name}</h1>
                <img src={w500Image(data.poster_path)} alt="movie_image"></img>
                <button onClick={() => navigate(`/showinfo/${data.id}`)}>
                  view more
                </button>
              </div>
            ))}
          </>
        ) : (
          <>
            {element.map((data) => (
              <div key={data.id}>
                <h1>{data.name}</h1>
                <img src={w500Image(data.poster_path)} alt="show_image"></img>
                <button onClick={() => navigate(`/showinfo/${data.id}`)}>
                  view more
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Tvdiscover;
