import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCardsByPublished, loadCardsBySold } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  componentDidMount() {
    this.props.loadCardsByPublished();
    this.props.loadCardsBySold();
  }

  render() {
    const publishCards = filterByUserId(this.props.publishCards, this.props.user.id);
    const soldCards = filterByUserId(this.props.soldCards, this.props.user.id);

    return (
      <div className="UserHomepage">
        <h1>User Home</h1>
        <div className="cards-published">
          <h3>Published</h3>
          <CardsList userCards={publishCards} />
        </div>
        <div className="cards-sold">
          <h3>Sold</h3>
          <CardsList userCards={soldCards} />
        </div>
      </div>
    );
  }
}

function filterByUserId(cards, userId) {
  const newCards = cards.filter(card => {
    return Number(card.seller_id) === Number(userId);
  });

  return newCards;
}

const mapStateToProps = state => {
  return {
    soldCards: state.soldList,
    publishCards: state.publishList,
    user: state.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCardsByPublished: userId => {
      dispatch(loadCardsByPublished(userId));
    },
    loadCardsBySold: userId => {
      dispatch(loadCardsBySold(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomepage);
