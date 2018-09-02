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

    const styles = {
      backgroundImage: 'url(' + this.props.photo + ')',
      backgroundSize: 'contain',
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
            to={{
              pathname: `/items/${this.props.id}`, state: {
                title: this.props.title,
                photo: this.props.photo,
                price: this.props.price,
                condition: this.props.condition,
                manufacturer: this.props.manufacturer,
                dimensions: this.props.dimensions,
                details: this.props.details,
                seller: this.props.seller,
                category: this.props.category,
                status: this.props.status,
              }
            }}
            id={this.props.id}
          >
            <div className="card-title">
              {this.props.title}
            </div>
            {/* {truncateText(this.props.title, 32) */}
            {/* } */}
          </Link>
          <div className="price">{this.props.price}</div>
        </div>
      </div>
    );
  }
}

// function truncateText(str, maxLength) {
//   // Source (Stack Overflow): https://goo.gl/BDKhqs
//   return str.length <= maxLength
//     ? str
//     : str.substr(0, str.lastIndexOf(' ', maxLength)) + ' \u2026';
// }

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
