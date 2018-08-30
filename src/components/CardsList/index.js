import React from 'react';
import Card from '../Card'
import './CardsList.css'
import { connect } from 'react-redux';
import { loadCards } from '../../actions'
import { Route, Switch } from 'react-router-dom';
import ItemDetail from '../ItemDetail';
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
    <Switch>
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
            />
          })
        }
      </div>
      <Route
        exact
        path="/items/:id"
        component={ItemDetail}
      />
    </Switch>
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