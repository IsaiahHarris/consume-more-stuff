import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';
import axios from 'axios';
import './itemDetail.css';
import Button from '../Button';

let realCard = '';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: axios.get(`/api/items/${this.props.match.params.id}`)
        .then(response => {
          console.log('response.data[0]', response.data[0]);
          realCard = response.data[0]
        })
    };
  }

  componentWillMount() {
    let item;
    this.props.loadCard(this.props.match.params.id);
    this.setState({ item });
  }

  render() {
    const photo = realCard.image_url
    console.log('realCard', realCard);
    const styles = {
      backgroundImage: "url(" + photo + ")"
    };
    const conditionName = realCard && realCard.condition ? realCard.condition.name : null

    return (
      <div className="item-container">
        <h3></h3>
        <div style={styles} className="item-photo" />
        <div className="item-info">
          <div className="item-info-condition">
            Condition: <strong>{conditionName}</strong>
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
