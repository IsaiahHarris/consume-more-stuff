import React from 'react';
import './Card.css';
import { connect } from 'react-redux';
import { loadCards } from '../../actions';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.loadCards();
  // }

  render() {
    const styles = {
      backgroundImage: 'url(' + this.props.photo + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100px',
      width: '120px'
    };

    return (
      <div className="main-card-container">
        <div className="card-container">
          <div className={this.props.condition}>{this.props.condition}</div>
          <div style={styles} className="photo" />
          <a href="">{truncateText(this.props.title, 32)}</a>
          <div className="price">{this.props.price}</div>
        </div>
      </div>
    );
  }
}

function truncateText(str, maxLength) {
  // Source (Stack Overflow): https://goo.gl/BDKhqs
  return str.length <= maxLength
    ? str
    : str.substr(0, str.lastIndexOf(' ', maxLength)) + ' \u2026';
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
