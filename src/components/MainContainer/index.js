import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';
import ItemDetail from '../ItemDetail';
import ItemNew from '../ItemNew';
import Login from '../Login';

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.loggedIn = false;
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  checkLoggedIn() {
    console.log('This is current logged in user', this.props.user);
    if(this.props.user.length > 0) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  render() {
    this.checkLoggedIn();
    
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
            render={() => (
              this.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login />
              )
            )}
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
