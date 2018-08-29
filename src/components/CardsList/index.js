import React from 'react';
import Card from '../Card'
import './CardsList.css'
class CardsList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="cards-list-container">
        {/* map cards here */}
        <Card />
        <Card />
      </div>
    )
  }
}

export default CardsList;