import React from 'react';
import './Card.css'
class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card-container">
        <div className="photo"></div>
        <a href="">this is title</a>
        <div className="price">price</div>
      </div>
    )
  }
}

export default Card;