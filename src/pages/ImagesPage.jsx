import React from 'react';
import FetchImages from '../compnents/MovieDetailsPage/FetchImages';

const ImagesPage = () => {
  return (
    <div className="bg-black md:p-10 min-h-screen flex items-center justify-center">
      <div className="w-full "> {/* Controls width */}
        <FetchImages showAll={true}/>
      </div>
    </div>
  );
};

export default ImagesPage;
