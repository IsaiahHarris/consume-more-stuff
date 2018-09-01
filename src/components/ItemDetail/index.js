import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';
import axios from 'axios';
import './itemDetail.css';
import Button from '../Button';

let card = '';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: axios.get(`/api/items/${this.props.match.params.id}`)
        .then(response => {
          console.log('response.data[0]', response.data[0]);
          card = response.data[0]
        })
    };
  }

  componentWillMount() {
    let item;
    this.props.loadCard(this.props.match.params.id);
    this.setState({ item });
  }

  render() {
    const photo = card.image_url
    console.log('card', card);
    const styles = {
      backgroundImage: "url(" + photo + ")"
    };
    const conditionName = card && card.condition ? card.condition.name : null

    return (
      <div className="item-container">
        <h3></h3>
        <div style={styles} className="item-photo" />
        <div className="item-info">
          <div className="item-info-condition">
            Condition: <strong>{conditionName}</strong>
          </div>
          {/* Only render the following info if a value is given: */}

          {card.price && <div className="item-info-price">
            Price: <strong>{card.price}</strong>
          </div>
          }


          {card.manufacturer && <div className="item-info-manufacturer">
            Make: <strong>{card.manufacturer}</strong>
          </div>
          }


          {card.model && <div className="item-info-model">
            Model: <strong>{card.model}</strong>
          </div>
          }
          {card.dimensions && < div className="item-info-dimensions">
            Dimensions: <strong>{card.dimensions}</strong>
          </div>
          }

          {card.details &&
            <div className="item-info-note">Note: {card.details} </div>
          }
        </div>
        <div className="item-buttons">
          <Button label="Reply" />
          <Button label="Back" />
        </div>
      </div >
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
