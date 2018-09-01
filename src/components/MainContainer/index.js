import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';
import ItemDetail from '../ItemDetail';
import ItemNew from '../ItemNew';
const MainContainer = () => {

  return (

    <div className="MainContainer">
      <Sidebar />
      <Switch>
        {/* NOTE: Change "Body" to something more descriptive, e.g., Home Page */}
        <Route
          exact path="/"
          component={Body}
        />
        <Route
          exact path="/items/new"
          component={ItemNew}
        />
        <Route
          exact path="/items/:id"
          component={ItemDetail}
        />
        <Route
          exact path="/login"
          render={() => {
            return <h1>LOGIN</h1>;
          }}
        />
      </Switch>
    </div>

  );

};

export default MainContainer;
