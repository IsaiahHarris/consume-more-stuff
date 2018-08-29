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

    const cardsSortedByTime = this.props.cards;

    cardsSortedByTime.sort(function (a, b) {
      return a.created_at - b.created_at
    })

    return (
      <div className="cards-list-container">
        {
          cardsSortedByTime.slice(0, 4).map((card, i) => {
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