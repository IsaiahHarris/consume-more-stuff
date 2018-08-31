import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';
import Button from '../Button';
import './itemDetail.css';
class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

  }
  // componentDidMount() {
  //   this.props.loadCard(4)
  //   console.log('this.props.after', this.props);
  // }
  render() {

    const {
      title,
      price,
      manufacturer,
      model,
      dimensions,
      details,
      photo,
      seller,
      category,
      status,
      condition
    } = this.props.location.state
    const styles = {
      backgroundImage: 'url(' + photo + ')',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '20vh',
      width: '150px',
      paddingTop: '3%'
    };
    return (
      <div className="item-detail-view-container">
        <div style={styles} className="item-photo"></div>
        <div className="item-header">
          <div className="item-title">{title}</div>
          <div className="seller">{seller}</div>
        </div>
        <div className="add-button-container">
          <Button label='Add Photo' />
        </div>
        <div className="item-details-container">
          <div className="item-price">Price: {price}</div>
          <div className="item-condition">Condition: {condition}</div>
          <div className="item-manufacturer">Make: {manufacturer}</div>
          <div className="item-model">Model: {model}</div>
          <div className="item-dimensions">dimensions: {dimensions}</div>
          <div className="item-note">Note: {details}</div>
        </div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   console.log('state', state);
//   return {
//     card: state.cardsList,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadCard: card => {
//       dispatch(loadCard(card))
//     }
//   }
// }

export default ItemDetail;