import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCard, loadCategories } from '../../actions';
import './ItemNew.css';
import Button from '../Button';

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
    this.props.loadCategories()
  }
  handleInputChange(event) {
    switch (event.target.value) {
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
      case 'category':
        this.setState({ categoryInput: event.target.value })
        break;
      case 'itemStatus':
        this.setState({ itemStatusInput: event.target.value })
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
    data.image = this.state.imageInput
    data.seller = this.state.sellerInput
    data.category = this.state.categoryInput
    data.itemStatus = this.state.itemStatusInput
    data.condition = this.state.conditionInput
    this.props.addCard(data)
  }

  render() {
    console.log('this.props addnew', this.props);
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
          <div className="item-title"></div>
          <div className="seller"></div>
        </div>
        <div className="add-button-container">
          <Button label='Add Photo' />
        </div>
        <div className="item-details-container">
          <div className="item-price">Price: </div>
          <div className="item-condition">Condition: </div>
          <div className="item-manufacturer">Make: </div>
          <div className="item-model">Model: </div>
          <label htmlFor="dimensions">Dimensions: </label>
          <input
            type="text"
            name="dimensions"
            id="dimensions"
            value={this.state.conditionInput}
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
                <option>{category.name}</option>
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

        </div>
        <Button label="Add" onClick={this.addNewCard} />
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
    }
  }
}
const mapStateToProps = state => {
  return {
    categories: state.categoriesList
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);
