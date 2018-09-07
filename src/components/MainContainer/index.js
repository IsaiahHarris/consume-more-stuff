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

const ProtectedRoute = ({ component: Component, authed, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class MainContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.setState({
        loggedIn: true
      });
    } else {
      this.setState({
        loggedIn: false
      });
    }


  }

  render() {
    let authenticated = localStorage.user ?  localStorage.user.length > 0 : this.props.user.username;

    return (
      <div className="MainContainer">
        <Sidebar />
        <Switch>
          {/* NOTE: Change "Body" to something more descriptive, e.g., Home Page */}
          <Route exact path="/" component={Body} />
          <ProtectedRoute
            authed={authenticated}
            exact
            path="/items/new"
            component={ItemNew}
          />
          <ProtectedRoute
            exact
            path="/items/:id/edit"
            component={ItemEdit}
            authed={authenticated}
          />
          <Route exact path="/items/:id" component={ItemDetail} />
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
          <ProtectedRoute
            exact
            path="/inventory"
            component={UserHomepage}
            authed={authenticated}
          />
          <ProtectedRoute
            exact
            path="/user/settings"
            component={Settings}
            authed={authenticated}
          />
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
