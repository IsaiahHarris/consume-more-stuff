import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './MainContainer.css';
import Sidebar from '../Sidebar';
import Body from '../Body';
import ItemDetail from '../ItemDetail';
import Login from '../Login';

class MainContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('This is current logged in user', this.props.user);
    
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
  }
}

const mapStateToProps = state => {
  return {
    user: state.usersList
  }
}

export default connect(mapStateToProps)(MainContainer);
