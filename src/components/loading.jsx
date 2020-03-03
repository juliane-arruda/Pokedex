import React from 'react';
import './loading.scss';

const Loading = () => {
  return(
    <div className="h-100 d-flex justify-content-center mt-5">
      <img src="/images/pokeball.png" alt="pokeball" className="loading"/>
    </div>
  );
};

export default Loading;