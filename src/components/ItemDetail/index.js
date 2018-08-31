import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';

import './itemDetail.css';
import Button from '../Button';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
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
    } = this.props.location.state;

    const styles = {
      backgroundImage: 'url(' + photo + ')'
    };

    return (
      <div className="item-container">
        <h3>{title}</h3>
        <div style={styles} className="item-photo" />
        <div className="item-info">
          <div className="item-info-condition">
            Condition: <strong>{condition}</strong>
          </div>
          {/* Only render the following info if a value is given: */}
          {price && (
            <div className="item-info-price">
              Price: <strong>{price}</strong>
            </div>
          )}
          {manufacturer && (
            <div className="item-info-manufacturer">
              Make: <strong>{manufacturer}</strong>
            </div>
          )}
          {model && (
            <div className="item-info-model">
              Model: <strong>{model}</strong>
            </div>
          )}
          {dimensions && (
            <div className="item-info-dimensions">
              Dimensions: <strong>{dimensions}</strong>
            </div>
          )}
          {details && <div className="item-info-note">Note: {details}</div>}
        </div>
        <div className="item-buttons">
          <Button label="Reply" />
          <Button label="Back" />
        </div>
      </div>
    );
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
