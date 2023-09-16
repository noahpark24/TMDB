//Dependencies
import React from 'react';
import { useSelector } from 'react-redux';
//Config
import TvShowsCard from '../views/TvShowsCard';

const Tvdiscover = ({ element }) => {
  const searched = useSelector((state) => state.tvshowSearchs);

  return (
    <div className="max-w-screen-lg p-12 mx-auto flex flex-col justify-center w-full h-full">
      <div>
        {searched.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12  sm:px-0 ">
              {searched.map((value) => (
                <div>
                  <TvShowsCard key={value.id} {...value} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 px-12  sm:px-0 ">
              {element.map((value) => (
                <div>
                  <TvShowsCard key={value.id} {...value} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tvdiscover;
