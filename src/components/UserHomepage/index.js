import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCardsByPublished, loadCardsBySold } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.loadCardsByPublished();
    this.props.loadCardsBySold();
  }

  render() {
    console.log('this.props.user auth-home: ', this.props.user);
    console.log('soldCards: ', this.props.soldCards);
    const publishCards = filterByUserId(this.props.publishCards, this.props.user.userId);
    const soldCards = filterByUserId(this.props.soldCards, this.props.user.userId);

    return (
      <div className="UserHomepage">
      <h1>User Home</h1>
         <div className="cards-published">
          <h3>Published</h3>
          <CardsList cards={publishCards}/>
        </div>
        <div className="cards-sold">
          <h3>Sold</h3>
          <CardsList cards={soldCards}/>
        </div>
      </div>
    )
  }
}

function filterByUserId(cards, userId) {
  const newCards = cards.filter(card => {
    console.log(card.seller_id);
    return (Number(card.seller_id) === Number(userId));
  })

  console.log('filterByCards : ', newCards);
  return newCards
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
