import React from 'react';
import { connect } from 'react-redux';
import Button from '../Button';
import './ItemEdit.css'
import { editCard, loadCategories, loadConditions, loadCard } from '../../actions';
import EditCardButton from '../EditCardButton';

class ItemEdit extends React.Component {
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
    this.editThisCard = this.editThisCard.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCategories();
    this.props.loadConditions();
    this.props.loadCard(this.props.match.params.id);

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

  editThisCard() {

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
    data.id = this.props.match.params.id
    data.seller_id = 1;

    this.props.editCard(data)
  }
  static getDerivedStateFromProps(props, state) {

    let realCard = props.card[0]
    if (realCard) {
      return {
        titleInput: state.titleInput || realCard[0].title,
        priceInput: state.priceInput || realCard[0].price,
        manufacturerInput: state.manufacturerInput || realCard[0].manufacturer,
        modelInput: state.modelInput || realCard[0].model,
        dimensionsInput: state.dimensionsInput || realCard[0].dimensions,
        detailsInput: state.detailsInput || realCard[0].details,
        imageInput: state.imageInput || realCard[0].image_url,
        sellerInput: state.sellerInput || realCard[0].seller_id,
        categoryInput: state.categoryInput || realCard[0].category_id,
        itemStatusInput: state.itemStatusInput || realCard[0].item_status_id,
        conditionInput: state.conditionInput || realCard[0].condition_id
      }
    } else {
      return null;
    }

  }

  render() {
    if (this.props.card[0]) {

      let propsCard = this.props.card[0]
      let realCard = propsCard[0]

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
              {this.props.conditions.map((condition, i) => {
                return (
                  <option key={i} value={condition.id}>{condition.name}</option>
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
              {this.props.categories.map((category, i) => {
                return (
                  <option key={i} value={category.id} >{category.name}</option>
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
          <EditCardButton label="Add" clickHandler={this.editThisCard} />
        </div>
      )
    } else {
      return (
        ''
      )
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editCard: card => {
      dispatch(editCard(card))
    },
    loadCategories: () => {
      dispatch(loadCategories())
    },
    loadConditions: () => {
      dispatch(loadConditions())
    },
    loadCard: (card) => {
      dispatch(loadCard(card))
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemEdit);