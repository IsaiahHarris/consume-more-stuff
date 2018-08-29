import React from 'react';
import './Card.css'
import { connect } from 'react-redux';
import { loadCards } from '../../actions'
class Card extends React.Component {
  constructor(props) {
    super(props)
    console.log('this.props', this.props);
  }

  // componentDidMount() {
  //   this.props.loadCards();
  // }

  render() {
    return (
      <div className="card-container">
        <div className="photo"></div>
        <a href="">{this.props.title}</a>
        <div className="price">{this.props.price}</div>
      </div>
    )
  }
}

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

export default Card;