import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './itemDetail.css';
import { loadCard, deleteCard } from '../../actions';
import Button from '../Button';

function switchCardVariable(card, location) {
  if (card) {
    return card[0];
  } else if (location) {
    return location;
  } else {
    return '404';
  }
}

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadCard(this.props.match.params.id);
  }

  render() {
    let card = switchCardVariable(
      this.props.card[0],
      this.props.location.state
    );

    if (card === '404') {
      return '';
    } else if (!card) {
      return '';
    } else {
      const photo = card.image_url;
      const styles = {
        backgroundImage: 'url( ' + photo + ')'
      };
      const conditionName = card && card.condition ? card.condition.name : null;

      const sellerId = card && card.seller_id ? card.seller_id : null;
      const userId = parseInt(this.props.user.id);

      return (
        <div className="item-container">
          <div className="card-title-detail">
            <h3>{card.title}</h3>
          </div>

          <div style={styles} className="item-photo" />

          <div className="item-info">
            <div className="item-info-condition">
              Condition: <strong>{conditionName}</strong>
            </div>

            {/* Only render the following info if a value is given: */}
            {card.price && (
              <div className="item-info-price">
                Price: <strong>{card.price}</strong>
              </div>
            )}
            {card.manufacturer && (
              <div className="item-info-manufacturer">
                Make: <strong>{card.manufacturer}</strong>
              </div>
            )}
            {card.model && (
              <div className="item-info-model">
                Model: <strong>{card.model}</strong>
              </div>
            )}
            {card.dimensions && (
              <div className="item-info-dimensions">
                Dimensions: <strong>{card.dimensions}</strong>
              </div>
            )}
            {card.details && (
              <div className="item-info-note">Note: {card.details} </div>
            )}
          </div>

          <div className="item-buttons">
            <Button label="Reply" />

            {userId === sellerId && (
              <Link to={`/items/${this.props.match.params.id}/edit`}>
                <Button label="Edit" />
              </Link>
            )}

            {userId === sellerId && (
              <Button
                label="Delete"
                clickHandler={() => {
                  this.props.deleteCard(this.props.match.params.id);
                }}
              />
            )}

            <Link to={'/'}>
              <Button label="Back" />
            </Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    card: state.cardsList,
    user: state.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCard: card => {
      dispatch(loadCard(card));
    },
    deleteCard: card => {
      dispatch(deleteCard(card));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
