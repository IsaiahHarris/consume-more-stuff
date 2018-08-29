import React from 'react';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      <Sidebar />
      <Body />
    </div>
  );
};


export default MainContainer;
