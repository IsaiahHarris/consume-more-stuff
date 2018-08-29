import React from 'react';
import Card from '../Card'
import './CardsList.css'
import { connect } from 'react-redux';
import { loadCards } from '../../actions'
class CardsList extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.loadCards();
  }
  render() {

    function determineNumberOfCardsDisplayed() {

    }

    const size = 2;

    const cardsSortedByTime = this.props.cards;

    console.log(cardsSortedByTime.sort(function (a, b) {
      return a.created_at - b.created_at
    }))

    return (
      <div className="cards-list-container">
        {
          this.props.cards.slice(0, size).map((card, i) => {
            return <Card
              key={i}
              title={card.title}
              photo={card.image_url}
              price={card.price}
              condition={card.condition_id}
            />
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cardsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCards: () => {
      dispatch(loadCards())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsList);