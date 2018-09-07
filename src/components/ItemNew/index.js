import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addCard,
  loadCategories,
  loadConditions,
  checkUser
} from '../../actions';
import './ItemNew.css';
import Button from '../Button';
import AddNewButton from '../AddNewButton';
import { Link } from 'react-router-dom';

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
      conditionInput: '',
      imageUploadData: '',
      imageUploadUrl: 'https://i.imgur.com/34axnfY.png',
      titleError: '',
      categoryError: '',
      conditionError: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.validation = this.validation.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.checkUser();
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
      case 'fileUpload':
        this.handleImageUpload(event);
        break;
      default:
        break;
    }
  }

  handleImageUpload(event) {
    const preview = document.getElementsByClassName('item-new-photo-img')[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        preview.style.backgroundImage = 'url("' + reader.result + '")';
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }

    this.setState({
      imageUploadData: file,
      imageUploadUrl: file
        ? `${reader.result}`
        : 'https://i.imgur.com/34axnfY.png' // Restore placeholder image.
    });
  }

  addNewCard() {
    const data = {};
    data.title = this.state.titleInput;
    data.price = this.state.priceInput;
    data.manufacturer = this.state.manufacturerInput;
    data.model = this.state.modelInput;
    data.dimensions = this.state.dimensionsInput;
    data.details = this.state.detailsInput;
    data.image_data = this.state.imageUploadData;
    data.image_url = this.state.imageUploadUrl;
    data.category_id = this.state.categoryInput;
    data.condition_id = this.state.conditionInput;
    data.item_status_id = 1;
    data.seller_id = this.props.user.id;
    this.props.addCard(data);
    this.setState({
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
      conditionInput: '',
      imageUploadData: '',
      imageUploadUrl: 'https://i.imgur.com/34axnfY.png',
      titleError: '',
      categoryError: '',
      conditionError: ''
    });
  }

  validation(event) {
    if (event.target.name === 'title' && !this.state.titleInput) {
      let titleError = 'Title Is Required To Add An Item';
      this.setState({
        titleError: titleError
      });
    }

    if (event.target.name === 'category' && !this.state.categoryInput) {
      let categoryError = 'Category Is Required To Add An Item';
      this.setState({
        categoryError: categoryError
      });
    }

    if (event.target.name === 'condition' && !this.state.conditionInput) {
      let conditionError = 'Condition Is Required To Add An Item';
      this.setState({
        conditionError: conditionError
      });
    }
  }

  render() {
    const { titleInput, conditionInput, categoryInput } = this.state;
    let isEnabled =
      titleInput.length > 0 &&
      conditionInput.length > 0 &&
      categoryInput.length > 0;
    const styles = {
      backgroundImage: 'url("' + this.state.imageUploadUrl + '")',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    };

    return (
      <div className="item-new-container">
        <div className="item-new-photo">
          <Link to={'/'}>
            <Button label="Back" />
          </Link>
          <div style={styles} className="item-new-photo-img" />

          <div id="item-new-photo-upload">
            <input
              type="file"
              name="fileUpload"
              id="fileUpload"
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className="item-new-details">
          {this.props.user.error && (
            <div>Please Try Again With Required Fields</div>
          )}
          <div className="header-button" />
          <div className="item-new-details-input">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              name="title"
              id="title"
              value={this.state.titleInput}
              onChange={this.handleInputChange}
              placeholder="Title (required)"
              onBlur={this.validation}
            />
            {!isEnabled && this.state.titleError ? (
              <div className="title-error">{this.state.titleError}</div>
            ) : (
              ''
            )}
          </div>

          <div className="item-new-details-input">
            <label htmlFor="category">Category: </label>
            <select
              name="category"
              id="category"
              value={this.state.categoryInput}
              onChange={this.handleInputChange}
              onBlur={this.validation}
            >
              <option value="">--Category (required)--</option>
              {this.props.categories.map(category => {
                return <option value={category.id}>{category.name}</option>;
              })}
            </select>
            {!isEnabled && this.state.categoryError ? (
              <div className="title-error">{this.state.categoryError}</div>
            ) : (
              ''
            )}
          </div>

          <div className="item-new-details-input">
            <label htmlFor="condition">Condition: </label>
            <select
              name="condition"
              id="condition"
              value={this.state.conditionInput}
              onChange={this.handleInputChange}
              onBlur={this.validation}
            >
              <option value="">--Condition (required)--</option>
              {this.props.conditions.map(condition => {
                return <option value={condition.id}>{condition.name}</option>;
              })}
            </select>
            {!isEnabled && this.state.conditionError ? (
              <div className="title-error">{this.state.conditionError}</div>
            ) : (
              ''
            )}
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
          <AddNewButton
            label="SUBMIT"
            disable={!isEnabled}
            clickHandler={this.addNewCard}
          />
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
    },
    checkUser: () => {
      dispatch(checkUser());
    }
  };
};

const mapStateToProps = state => {
  return {
    categories: state.categoriesList,
    conditions: state.conditionsList,
    card: state.cardsList,
    user: state.usersList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemNew);
