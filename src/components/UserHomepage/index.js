import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCardsByPublished, loadCardsBySold } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    console.log('componentDidMount', this.props.user);
    this.props.loadCardsByPublished();
    this.props.loadCardsBySold();
  }
  render() {
    console.log('this.props.user auth-home: ', this.props.user);
    console.log('soldCards: ', this.props.soldCards);

    return (
      <div className="UserHomepage">
      <h1>User Home</h1>
         <div className="cards-published">
          <h3>Published</h3>
          <CardsList cards={this.props.publishCards}/>
        </div>
        <div className="cards-sold">
          <h3>Sold</h3>
          <CardsList cards={this.props.soldCards}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    soldCards: state.soldList,
    publishCards: state.publishList,
    user: state.usersList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCardsByPublished: userId => {
      dispatch(loadCardsByPublished(userId));
    },
    loadCardsBySold: userId => {
      dispatch(loadCardsBySold(userId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomepage);
