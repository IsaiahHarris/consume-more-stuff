import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';
import ItemDetail from '../ItemDetail';
import ItemNew from '../ItemNew';
import Login from '../Login';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('This is current logged in user', this.props.user);

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
            component={Login}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  }
}

export default withRouter(connect(mapStateToProps)(MainContainer));
