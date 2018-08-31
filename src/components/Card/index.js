import React from 'react';
import './Card.css';
import { loadCard } from '../../actions';
import ItemDetail from '../ItemDetail'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.loadCard(2)
  //   console.log('this.props.after', this.props);
  // }

  render() {
    console.log('this.props', this.props);
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
          <Link
            to={`/items/${this.props.id}`}
            onClick={() => { this.props.loadCard(this.props.id) }}
            id={this.props.id}
          >
            {truncateText(this.props.title, 32)
            }
          </Link>
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
//   console.log('state', state);
//   return {
//     card: state.cardsList,
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    loadCard: card => {
      dispatch(loadCard(card))
    }
  }
}
export default connect(null, mapDispatchToProps)(Card);
