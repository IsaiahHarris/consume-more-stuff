import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';

import './itemDetail.css';
import Button from '../Button';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadCard(this.props.match.params.id)
  }

  render() {
    const card = this.props.card[0]
    console.log('card', card);
    const photo = card.image_url;
    const styles = {
      backgroundImage: 'url(' + photo + ')'
    };

    return (
      <div className="item-container">
        <h3></h3>
        <div style={styles} className="item-photo" />
        <div className="item-info">
          <div className="item-info-condition">
            Condition: <strong>{card.condition}</strong>
          </div>
          {/* Only render the following info if a value is given: */}

          <div className="item-info-price">
            Price: <strong></strong>
          </div>


          <div className="item-info-manufacturer">
            Make: <strong></strong>
          </div>


          <div className="item-info-model">
            Model: <strong></strong>
          </div>

          <div className="item-info-dimensions">
            Dimensions: <strong></strong>
          </div>

          <div className="item-info-note">Note: </div>
        </div>
        <div className="item-buttons">
          <Button label="Reply" />
          <Button label="Back" />

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state', state);
  return {
    card: state.cardsList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCard: card => {
      dispatch(loadCard(card))
    }
  }
}

export default connect(mapStateToProps, { loadCard })(ItemDetail);
