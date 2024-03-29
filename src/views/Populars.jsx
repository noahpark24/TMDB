import React from 'react';
//Config
import apiConfig from '../apiConfig';

const Populars = ({ title, poster_path, id }) => {
  const { w500Image } = apiConfig;

  return (
    <>
      <div className="z-10">
        <div className="shadow-md shadow-red-800 rounded-lg relative">
          <img
            className="rounded-md hover:scale-75"
            src={w500Image(poster_path)}
            alt={title}
          />
          {/* Hover Text */}
          <a href={`/movieinfo/${id}`}>
            <div className="bg-black bg-opacity-50 text-white absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
              <p>{title}</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Populars;
