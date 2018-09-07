import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './ItemEdit.css';
import Button from '../Button';
import EditCardButton from '../EditCardButton';
import {
  editCard,
  loadCard,
  loadCategories,
  loadConditions,
  loadItemStatuses
} from '../../actions';

class ItemEdit extends React.Component {
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
      imageUrl: '',
      imageUploadData: '',
      sellerInput: '',
      categoryInput: '',
      itemStatusInput: '',
      conditionInput: '',
      titleError: '',
      categoryError: '',
      conditionError: '',
      itemStatusError: ''
    };

    this.editThisCard = this.editThisCard.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.loadItemStatuses();
    this.props.loadCard(this.props.match.params.id);

    // Allows data inputs to initially be populated with database information:
    return axios
      .get(`/api/items/${this.props.match.params.id}`)
      .then(response => {
        const initialData = response.data[0];

        // Necessary to include empty string alternative to prevent warning:
        this.setState({
          titleInput: initialData.title || '',
          priceInput: initialData.price || '',
          manufacturerInput: initialData.manufacturer || '',
          modelInput: initialData.model || '',
          dimensionsInput: initialData.dimensions || '',
          detailsInput: initialData.details || '',
          imageUrl: initialData.image_url || '',
          sellerInput: initialData.seller_id || '',
          categoryInput: initialData.category_id || '',
          itemStatusInput: initialData.item_status_id || '',
          conditionInput: initialData.condition_id || ''
        });
      });
  }

  handleInputChange(event) {
    switch (event.target.id) {
      case 'title':
        // Remove error message if user has entered a valid title:
        this.setState({
          titleInput: event.target.value,
          titleError: event.target.value.length > 0 ? '' : this.state.titleError
        });
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
      case 'seller':
        this.setState({ sellerInput: event.target.value });
        break;
      case 'itemStatus':
        // Remove error message if user has selected an item status:
        this.setState({
          itemStatusInput: event.target.value,
          itemStatusError:
            event.target.value.length > 0 ? '' : this.state.itemStatusError
        });
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
    const preview = document.getElementsByClassName('item-edit-side-img')[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.backgroundImage = 'url("' + reader.result + '")';
    }, false);

    if (file) {
      reader.readAsDataURL(file);
      this.setState({ imageUploadData: file });
    } else {
      preview.style.backgroundImage = 'url("' + this.state.imageUrl + '")';
    }
  }

  editThisCard() {
    const data = {
      id: this.props.match.params.id,
      title: this.state.titleInput,
      price: this.state.priceInput,
      manufacturer: this.state.manufacturerInput,
      model: this.state.modelInput,
      dimensions: this.state.dimensionsInput,
      details: this.state.detailsInput,
      image_data: this.state.imageUploadData,
      category_id: this.state.categoryInput,
      condition_id: this.state.conditionInput,
      item_status_id: this.state.itemStatusInput,
      seller_id: this.props.user.id
    };

    this.props.editCard(data);
  }

  validateInputs(event) {
    if (event.target.name === 'title' && !this.state.titleInput) {
      const titleError = 'Title Required';
      this.setState({
        titleError: titleError
      });
    }

    if (event.target.name === 'category' && !this.state.categoryInput) {
      const categoryError = 'Category Required';
      this.setState({
        categoryError: categoryError
      });
    }

    if (event.target.name === 'condition' && !this.state.conditionInput) {
      const conditionError = 'Condition Required';
      this.setState({
        conditionError: conditionError
      });
    }

    if (event.target.name === 'itemStatus' && !this.state.itemStatusInput) {
      const itemStatusError = 'Status Required';
      this.setState({
        itemStatusError: itemStatusError
      });
    }
  }

  render() {
    const { titleInput } = this.state;
    const { itemStatusInput } = this.state;

    // Only enable submission of data containing valid title and item status:
    const isEnabled = titleInput.length > 0 && itemStatusInput.length > 0;

    if (this.props.card[0]) {
      const styles = {
        backgroundImage: 'url("' + this.state.imageUrl + '")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      };

      return (
        <div className="item-edit-container">
          <div className="item-edit-side">
            <div style={styles} className="item-edit-side-img" />

            <div id="item-edit-side-upload">
              <input
                type="file"
                name="fileUpload"
                id="fileUpload"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="item-edit-side-status">
              <label htmlFor="itemStatus">Status: </label>
              <select
                name="itemStatus"
                id="itemStatus"
                value={this.state.itemStatusInput}
                onChange={this.handleInputChange}
                onBlur={this.validateInputs}
              >
                <option value="">--Status--</option>
                {this.props.itemStatuses.map((status, i) => {
                  return (
                    <option key={i} value={status.id}>
                      {status.name}
                    </option>
                  );
                })}
              </select>
              {!isEnabled && this.state.itemStatusError ? (
                <div className="item-status-error">
                  {this.state.itemStatusError}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="item-edit-details">
            <div className="header-button" />

            <div className="item-edit-details-input">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.titleInput}
                onChange={this.handleInputChange}
                onBlur={this.validateInputs}
              />
              {!isEnabled && this.state.titleError ? (
                <div className="title-error">{this.state.titleError}</div>
              ) : (
                ''
              )}
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="category">Category: </label>
              <select
                name="category"
                id="category"
                value={this.state.categoryInput}
                onChange={this.handleInputChange}
              >
                <option value="">--Category--</option>
                {this.props.categories.map((category, i) => {
                  return (
                    <option key={i} value={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="condition">Condition: </label>
              <select
                name="condition"
                id="condition"
                value={this.state.conditionInput}
                onChange={this.handleInputChange}
              >
                <option value="">--Condition--</option>
                {this.props.conditions.map((condition, i) => {
                  return (
                    <option key={i} value={condition.id}>
                      {condition.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="price">Price: </label>
              <input
                type="text"
                name="price"
                id="price"
                value={this.state.priceInput}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="manufacturer">Manufacturer: </label>
              <input
                type="text"
                name="manufacturer"
                id="manufacturer"
                value={this.state.manufacturerInput}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="model">Model: </label>
              <input
                type="text"
                name="model"
                id="model"
                value={this.state.modelInput}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="dimensions">Dimensions: </label>
              <input
                type="text"
                name="dimensions"
                id="dimensions"
                value={this.state.dimensionsInput}
                onChange={this.handleInputChange}
              />
            </div>

            <div className="item-edit-details-input">
              <label htmlFor="details">Note: </label>
              <textarea
                name="details"
                id="details"
                value={this.state.detailsInput}
                onChange={this.handleInputChange}
              />
            </div>
            <EditCardButton
              label="SUBMIT"
              clickHandler={this.editThisCard}
              disable={!isEnabled}
            />
            <Link to={`/items/${this.props.match.params.id}`}>
              <Button label="Back" />
            </Link>
          </div>
        </div>
      );
    } else {
      return '';
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCard: card => {
      dispatch(editCard(card));
    },
    loadCard: card => {
      dispatch(loadCard(card));
    },
    loadCategories: () => {
      dispatch(loadCategories());
    },
    loadConditions: () => {
      dispatch(loadConditions());
    },
    loadItemStatuses: () => {
      dispatch(loadItemStatuses());
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.usersList,
    card: state.cardsList,
    categories: state.categoriesList,
    conditions: state.conditionsList,
    itemStatuses: state.itemStatusesList
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemEdit);
