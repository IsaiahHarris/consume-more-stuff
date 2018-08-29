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
    return (
      <div className="cards-list-container">
        {
          this.props.cards.map((card, i) => {
            console.log('card', card);
            return <Card key={i} />
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