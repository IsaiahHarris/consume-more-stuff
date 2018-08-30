import React from 'react';
import CardsList from '../CardsList';
import './Row.css'
const Row = props => {
  let filterFunc = filterCards(props.label, props.cards);
  return (
    <div className="row-container">
      <div className="label">{props.label}</div>
      <CardsList cards={filterFunc} />
    </div>
  )
  function filterCards(label, cards) {
    switch (label) {
      case 'Vehicles':
        return cards.filter(card => card.category_id === 1);
      case 'Computers':
        return cards.filter(card => card.category_id === 2);
      case 'Appliances':
        return cards.filter(card => card.category_id === 3)
      case 'Furniture':
        return cards.filter(card => card.category_id === 4)
      default:
        return cards;
    }
  }
}

export default Row;