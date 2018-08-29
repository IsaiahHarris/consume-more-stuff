import React from 'react';
import './Card.css'
import { connect } from 'react-redux';
import { loadCards } from '../../actions'

class Card extends React.Component {
  constructor(props) {
    super(props)

  }

  // componentDidMount() {
  //   this.props.loadCards();
  // }

  render() {

    const styles = {
      backgroundImage: "url(" + this.props.photo + ")",
      backgroundSize: '100% 100%',
      height: '80px',
      width: '120px',
    }

    return (
      <div className="main-card-container">
        <div className="card-container">
          <div className="condition">{this.props.condition}</div>
          <div style={styles} className="photo"></div>
          <a href="">{this.props.title}</a>
          <div className="price">{this.props.price}</div>
        </div>
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