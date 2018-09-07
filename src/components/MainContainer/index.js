import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';
import ItemDetail from '../ItemDetail';
import ItemNew from '../ItemNew';
import Login from '../Login';
import Register from '../Register';
import ItemEdit from '../ItemEdit';
import CardsByCategory from '../CardsByCategory';
import Settings from '../Settings';
import UserHomepage from '../UserHomepage';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = false;
    this.checkLoggedIn = this.checkLoggedIn.bind(this);
  }

  checkLoggedIn() {
    if (this.props.user.username) {
      this.loggedIn = true;
      console.log('logged in is true');
    } else {
      this.loggedIn = false;
      console.log('logged in is false')
    }
  }

  render() {
    this.checkLoggedIn();
    return (
      <div className="MainContainer">
        <Sidebar />
        <Switch>
          {/* NOTE: Change "Body" to something more descriptive, e.g., Home Page */}

          <Route exact path="/" component={Body} />
          <Route exact path="/items/:id/edit" component={ItemEdit} />
          <Route exact path="/items/new" component={ItemNew} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact
            path="/items/category/:categoryId"
            render={props => (
              <CardsByCategory key={props.match.params.categoryId} {...props} />
            )}
          />
          <Route
            exact 
            path="/inventory"
            render={() => (
              this.loggedIn ? (
                <UserHomepage />
              ) : (
                <Redirect to="/" />
                )
            )}
          />
          <Route exact path="/items/:id/edit" component={ItemEdit} />
          <Route exact path="/items/new" component={ItemNew} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route
            exact 
            path="/user/settings"
            render={() => (
              this.loggedIn ? (
                <Settings />
              ) : (
                <Redirect to="/" />
                )
            )}
          />
          <Route
            exact 
            path="/items/category/:categoryId"
            render={props => (
              <CardsByCategory key={props.match.params.categoryId} {...props} />
            )}
          />
          <Route exact path="/items/:id" component={ItemDetail} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  };
};

export default withRouter(connect(mapStateToProps)(MainContainer));
// export default connect(mapStateToProps, null)(MainContainer);
