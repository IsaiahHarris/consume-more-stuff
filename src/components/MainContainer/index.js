import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';
import ItemDetail from '../ItemDetail';
import Login from '../Login';

const MainContainer = () => {

  return (
    <Switch>
      <div className="MainContainer">
        <Sidebar />
        {/* NOTE: Change "Body" to something more descriptive, e.g., Home Page */}
        <Route
          exact path="/"
          component={Body}
        />
        <Route
          exact path="/items/:id"
          component={ItemDetail}
        />
        {/* <Route
          exact path="/login"
          render={() => {
            return <h1>LOGIN</h1>;
          }}
        /> */}
        <Route 
          exact path="/login"
          component={Login}
        />
      </div>
    </Switch>
  );

};

export default MainContainer;
