import React from 'react';
import './Card.css'
import { connect } from 'react-redux';
import { loadCards } from '../../actions'
import { Link } from 'react-router-dom';
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
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100px',
      width: '120px',
    }

    return (
      <div className="main-card-container">
        <div className="card-container">
          <li><Link to='/items/{this.props.title}'>login</Link></li>
          <div className={this.props.condition}>{this.props.condition}</div>
          <div style={styles} className="photo"></div>
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