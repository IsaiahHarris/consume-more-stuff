import React from 'react';
import Card from '../Card'
import './CardsList.css'

const CardsList = props => {

  // constructor(props) {
  //   super(props)
  // }
  // componentDidMount() {
  //   this.props.loadCards();
  // }
  // render() {

  const cardsSortedByTime = props.cards;

  cardsSortedByTime.sort(function (a, b) {
    return a.created_at - b.created_at
  })

  return (
    <div className="cards-list-container">
      {
        cardsSortedByTime.slice(0, 4).map((card, i) => {
          const conditionName = card && card.condition ? card.condition.name : null
          return <Card
            key={i}
            title={card.title}
            photo={card.image_url}
            price={card.price}
            condition={conditionName}
            id={card.id}
            card={card}
          />
        })
      }
    </div>
  )
}
// }

// const mapStateToProps = state => {
//   return {
//     cards: state.cardsList
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadCards: () => {
//       dispatch(loadCards())
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CardsList);
export default CardsList