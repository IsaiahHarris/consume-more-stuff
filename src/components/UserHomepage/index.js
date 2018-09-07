import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UserHomepage.css';
import { loadCardsByUser } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  componentDidMount() {
    this.props.loadCardsByUser(this.props.user.id);
  }

  render() {
    const publishedCards = filterByItemStatus(this.props.userCards, 1);
    const soldCards = filterByItemStatus(this.props.userCards, 2);

    return (
      <div className="UserHomepage">
        <h1>User Home</h1>
        <div className="cards-published">
          <h3>Published</h3>
          <CardsList userCards={publishedCards} />
        </div>
        <div className="cards-sold">
          <h3>Sold</h3>
          <CardsList userCards={soldCards} />
        </div>
      </div>
    );
  }
}

function filterByItemStatus(cards, itemStatusId) {
  const newCards = cards.filter(card => {
    return Number(card.item_status_id) === Number(itemStatusId);
  });

  return newCards;
}

const mapStateToProps = state => {
  return {
    user: state.usersList,
    userCards: state.userCardsList,
    itemStatuses: state.itemStatusesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCardsByUser: userId => {
      dispatch(loadCardsByUser(userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomepage);
