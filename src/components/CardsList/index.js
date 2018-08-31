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
          console.log('card', card);
          const conditionName = card && card.condition ? card.condition.name : null
          const sellerName = card && card.seller ? card.seller.username : null
          const categoryName = card && card.category ? card.seller.name : null
          const itemStatusName = card && card.itemStatus ? card.itemStatus.name : null
          console.log('itemStatusName', itemStatusName);
          return <Card
            key={i}
            title={card.title}
            photo={card.image_url}
            price={card.price}
            condition={conditionName}
            manufacturer={card.manufacturer}
            model={card.model}
            dimensions={card.dimensions}
            details={card.details}
            seller={sellerName}
            category={categoryName}
            itemStatusName={itemStatusName}
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