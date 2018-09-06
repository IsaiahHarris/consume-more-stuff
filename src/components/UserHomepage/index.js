import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCardsByPublished, loadCardsBySold } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.loadCardsByPublished(1);
    this.props.loadCardsBySold(1);
  }
  render() {
    console.log('this.props.soldCards ', this.props.soldCards);
    console.log('this.props.publishCards ', this.props.publishCards);

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
    publishCards: state.publishList
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
