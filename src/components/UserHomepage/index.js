import React, { Component } from 'react';
import { connect } from 'react-redux';

import './UserHomepage.css';
import CardsList from '../CardsList';
import { loadCardsByUser, loadItemStatuses, checkUser } from '../../actions';

class UserHomepage extends Component {
  componentDidMount() {
    this.props.loadCardsByUser();
  }

  render() {
    const cards = this.props.userCards ? this.props.userCards : null;
    const publishedCards = filterByItemStatus(cards, 1);
    const soldCards = filterByItemStatus(cards, 2);

    console.log('publishedCards', publishedCards);

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
  return cards.filter(card => {
    return Number(card.item_status_id) === Number(itemStatusId);
  });
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    user: state.usersList,
    userCards: state.userCardsList,
    itemStatuses: state.itemStatusesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCardsByUser: () => {
      dispatch(loadCardsByUser());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserHomepage);
