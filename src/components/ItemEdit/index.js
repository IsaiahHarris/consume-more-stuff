import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './ItemEdit.css';
import Button from '../Button';
import EditCardButton from '../EditCardButton';
import {
  editCard,
  loadCategories,
  loadConditions,
  loadCard
} from '../../actions';

const TEMP_SELLER_ID = 1;

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
      conditionInput: ''
    };

    this.editThisCard = this.editThisCard.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.loadCard(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props, state) {
    let initialData = props.card[0];

    if (initialData) {
      return {
        titleInput: state.titleInput || initialData[0].title,
        priceInput: state.priceInput || initialData[0].price,
        manufacturerInput:
          state.manufacturerInput || initialData[0].manufacturer,
        modelInput: state.modelInput || initialData[0].model,
        dimensionsInput: state.dimensionsInput || initialData[0].dimensions,
        detailsInput: state.detailsInput || initialData[0].details,
        imageUrl: initialData[0].image_url,
        sellerInput: state.sellerInput || initialData[0].seller_id,
        categoryInput: state.categoryInput || initialData[0].category_id,
        itemStatusInput: state.itemStatusInput || initialData[0].item_status_id,
        conditionInput: state.conditionInput || initialData[0].condition_id
      };
    } else {
      return null;
    }
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
    const preview = document.getElementsByClassName('item-edit-photo-img')[0];
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.style.backgroundImage = 'url("' + reader.result + '")';
    }, false);

    if (file) {
      reader.readAsDataURL(file);
      this.setState({ imageUploadData: file });
    } else {
      preview.style.backgroundImage =
        'url("' + this.state.imageUrl + '")';
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
      item_status_id: 1,
      seller_id: TEMP_SELLER_ID
    };

    this.props.editCard(data);
  }

  render() {
    if (this.props.card[0]) {
      const styles = {
        backgroundImage: 'url("' + this.state.imageUrl + '")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
      };

      return (
        <div className="item-edit-container">
          <div className="item-edit-photo">
            <Link to={`/items/${this.props.match.params.id}`}>
              <Button label="Back" />
            </Link>
            <div style={styles} className="item-edit-photo-img" />

            <div id="item-edit-photo-upload">
              <input
                type="file"
                name="fileUpload"
                id="fileUpload"
                onChange={this.handleInputChange}
              />
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
              />
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
            <EditCardButton label="SUBMIT" clickHandler={this.editThisCard} />
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
    loadCategories: () => {
      dispatch(loadCategories());
    },
    loadConditions: () => {
      dispatch(loadConditions());
    },
    loadCard: card => {
      dispatch(loadCard(card));
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
)(ItemEdit);
