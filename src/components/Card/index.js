import React from 'react';

class Card extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="card-container">
        <img className="photo" src="https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2de90538a97aac2a9fa7de03d28b8949&auto=format&fit=crop&w=2304&q=80" alt="" />
        <a href="">this is title</a>
        <div className="price">price</div>
      </div>
    )
  }
}

export default Card;