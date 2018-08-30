import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';

const MainContainer = () => {
  return (
    <div className="MainContainer">
      <Sidebar />
      <Router>
        <Switch>
{/* NOTE: Change "Body" to something more descriptive, e.g., Home Page */}
          <Route exact path="/" component={Body} />
          <Route
            path="/login"
            render={() => {
              return <h1>LOGIN</h1>;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default MainContainer;
