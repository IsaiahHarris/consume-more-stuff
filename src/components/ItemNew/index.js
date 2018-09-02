import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard, loadCategories, loadConditions } from '../../actions';
import './ItemNew.css';
import Button from '../Button';
import AddNewButton from '../../AddNewButton';
import { Link, Redirect } from 'react-router-dom';


class ItemNew extends React.Component {
  constructor(props) {
    super(props)
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
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.addCard()
  }
  handleInputChange(event) {
    switch (event.target.id) {
      case 'title':
        this.setState({ titleInput: event.target.value })
        break;
      case 'price':
        this.setState({ priceInput: event.target.value })
        break;
      case 'manufacturer':
        this.setState({ manufacturerInput: event.target.value })
        break;
      case 'model':
        this.setState({ modelInput: event.target.value })
        break;
      case 'dimensions':
        this.setState({ dimensionsInput: event.target.value })
        break;
      case 'details':
        this.setState({ detailsInput: event.target.value })
        break;
      case 'image':
        this.setState({ imageInput: event.target.value })
        break;
      case 'seller':
        this.setState({ sellerInput: event.target.value })
        break;
      case 'itemStatus':
        this.setState({ itemStatusInput: event.target.value })
        break;
      case 'category':
        this.setState({ categoryInput: event.target.value })
        break;
      case 'condition':
        this.setState({ conditionInput: event.target.value })
        break;
      default:
        break;
    }
  }

  addNewCard(event) {
    const data = {}
    data.title = this.state.titleInput
    data.price = this.state.priceInput
    data.manufacturer = this.state.manufacturerInput
    data.model = this.state.modelInput
    data.dimensions = this.state.dimensionsInput
    data.details = this.state.detailsInput
    data.image_url = 'https://i.imgur.com/34axnfY.png'
    data.category_id = this.state.categoryInput
    data.condition_id = this.state.conditionInput
    data.item_status_id = 1;
    data.seller_id = 1;
    this.props.addCard(data)
  }

  render() {

    const styles = {
      backgroundImage: 'url("https://i.imgur.com/34axnfY.png")',
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

          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.titleInput}
            onChange={this.handleInputChange} />

        </div>

        <div className="add-button-container">
          <Button label='Add Photo' />
        </div>

        <div className="item-details-container">

          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            id="price"
            value={this.state.priceInput}
            onChange={this.handleInputChange} />

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
              )
            })}
          </select>

          <label htmlFor="manufacturer">Manufacturer: </label>
          <input
            type="text"
            name="manufacturer"
            id="manufacturer"
            value={this.state.manufacturerInput}
            onChange={this.handleInputChange} />

          <label htmlFor="model">Model: </label>
          <input
            type="text"
            name="model"
            id="model"
            value={this.state.modelInput}
            onChange={this.handleInputChange} />

          <label htmlFor="dimensions">Dimensions: </label>
          <input
            type="text"
            name="dimensions"
            id="dimensions"
            value={this.state.dimensionsInput}
            onChange={this.handleInputChange} />

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
                <option value={category.id} >{category.name}</option>
              )
            })}
          </select>

          <label htmlFor="details">Note: </label>
          <input type="text"
            name="details"
            id="details"
            value={this.state.detailsInput}
            onChange={this.handleInputChange}
          />
          <label htmlFor="seller">Seller: </label>
          <input type="text"
            name="seller"
            id="seller"
            value={this.state.sellerInput}
            onChange={this.handleInputChange}
          />
          <label htmlFor="itemStatus">ItemStatus: </label>
          <input type="text"
            name="itemStatus"
            id="itemStatus"
            value={this.state.itemStatusInput}
            onChange={this.handleInputChange}
          />
        </div>
        <AddNewButton label="Add" clickHandler={this.addNewCard} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCard: card => {
      dispatch(addCard(card))
    },
    loadCategories: () => {
      dispatch(loadCategories())
    },
    loadConditions: () => {
      dispatch(loadConditions())
    }
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categoriesList,
    conditions: state.conditionsList,
    card: state.cardsList
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);
