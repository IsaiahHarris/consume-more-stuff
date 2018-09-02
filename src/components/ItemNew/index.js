import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard, loadCategories, loadConditions } from '../../actions';
import './ItemNew.css';
import Button from '../Button';
import AddNewButton from '../AddNewButton';
import { Link } from 'react-router-dom';

const TEMP_SELLER_ID = 800913;

class ItemNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleInput: '',
      priceInput: '',
      manufacturerInput: '',
      modelInput: '',
      dimensionsInput: '',
      detailsInput: '',
      imageInput: '',
      sellerInput: '',
      categoryInput: '',
      itemStatusInput: '',
      conditionInput: ''
    };

    this.imageUrl = '';

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.addCard();
  }

  handleInputChange(event) {
    switch (event.target.id) {
      case 'title':
        this.setState({ titleInput: event.target.value });
        break;
      case 'price':
        this.setState({ priceInput: event.target.value });
        break;
      case 'manufacturer':
        this.setState({ manufacturerInput: event.target.value });
        break;
      case 'model':
        this.setState({ modelInput: event.target.value });
        break;
      case 'dimensions':
        this.setState({ dimensionsInput: event.target.value });
        break;
      case 'details':
        this.setState({ detailsInput: event.target.value });
        break;
      case 'image':
        this.setState({ imageInput: event.target.value });
        break;
      case 'seller':
        this.setState({ sellerInput: event.target.value });
        break;
      case 'itemStatus':
        this.setState({ itemStatusInput: event.target.value });
        break;
      case 'category':
        this.setState({ categoryInput: event.target.value });
        break;
      case 'condition':
        this.setState({ conditionInput: event.target.value });
        break;
      default:
        break;
    }
  }

  handleImageSubmit() {
    const file = document.getElementById('item-new-photo-form')[1]['files'][0]
    console.log('FILE', file);

    this.imageUrl = `https://cms-2018.s3.amazonaws.com/${TEMP_SELLER_ID}/${file.name}`;
  }

  addNewCard() {
    const data = {};

    data.title = this.state.titleInput;
    data.price = this.state.priceInput;
    data.manufacturer = this.state.manufacturerInput;
    data.model = this.state.modelInput;
    data.dimensions = this.state.dimensionsInput;
    data.details = this.state.detailsInput;
    data.image_url = this.imageUrl ? this.imageUrl : 'https://i.imgur.com/34axnfY.png';
    data.category_id = this.state.categoryInput;
    data.condition_id = this.state.conditionInput;
    data.item_status_id = 1;
    data.seller_id = TEMP_SELLER_ID;

    this.props.addCard(data);
  }

  render() {
    const styles = {
      backgroundImage: 'url("https://i.imgur.com/34axnfY.png")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };

    const iframeStyles = {
      position: 'absolute',
      top: '-1px',
      left: '-1px',
      width: '1px',
      height: '1px'
    };

    return (
      <div className="item-new-container">

        <div className="item-new-photo">
          <Link to={'/'}>
            <Button label="Back" />
          </Link>
          <div style={styles} className="item-new-photo-img" />

          <iframe name="hiddenFrame" style={iframeStyles} />

          <form
            id="item-new-photo-form"
            action="/api/s3Upload"
            method="POST"
            encType="multipart/form-data"
            onSubmit={this.handleImageSubmit}
            target="hiddenFrame"
          >
            <input type="text" name="userId" value={TEMP_SELLER_ID} hidden />
            <input type="file" name="fileUpload" />
            <div className="item-new-photo-btn">
              <input type="submit" />
            </div>
          </form>
        </div>

        <div className="item-new-details">
          <div className="header-button">
          </div>
          <div className="item-new-details-input">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.titleInput}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="item-new-details-input">
            <label htmlFor="category">Category: </label>
            <select
              name="category"
              id="category"
              value={this.state.categoryInput}
              onChange={this.handleInputChange}
            >
              <option value="">--Category--</option>
              {this.props.categories.map(category => {
                return (
                  <option value={category.id}>{category.name}</option>
                );
              })}
            </select>
          </div>

          <div className="item-new-details-input">
            <label htmlFor="condition">Condition: </label>
            <select
              name="condition"
              id="condition"
              value={this.state.conditionInput}
              onChange={this.handleInputChange}
            >
              <option value="">--Condition--</option>
              {this.props.conditions.map(condition => {
                return (
                  <option value={condition.id}>{condition.name}</option>
                );
              })}
            </select>
          </div>

          <div className="item-new-details-input">
            <label htmlFor="price">Price: </label>
            <input
              type="text"
              name="price"
              id="price"
              value={this.state.priceInput}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="item-new-details-input">
            <label htmlFor="manufacturer">Manufacturer: </label>
            <input
              type="text"
              name="manufacturer"
              id="manufacturer"
              value={this.state.manufacturerInput}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="item-new-details-input">
            <label htmlFor="model">Model: </label>
            <input
              type="text"
              name="model"
              id="model"
              value={this.state.modelInput}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="item-new-details-input">
            <label htmlFor="dimensions">Dimensions: </label>
            <input
              type="text"
              name="dimensions"
              id="dimensions"
              value={this.state.dimensionsInput}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="item-new-details-input">
            <label htmlFor="details">Note: </label>
            <textarea
              name="details"
              id="details"
              value={this.state.detailsInput}
              onChange={this.handleInputChange}
            />
          </div>
          <AddNewButton label="SUBMIT" clickHandler={this.addNewCard} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: card => {
      dispatch(addCard(card));
    },
    loadCategories: () => {
      dispatch(loadCategories());
    },
    loadConditions: () => {
      dispatch(loadConditions());
    }
  };
};

const mapStateToProps = state => {
  return {
    categories: state.categoriesList,
    conditions: state.conditionsList,
    card: state.cardsList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemNew);
