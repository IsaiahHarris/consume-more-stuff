import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCards, loadCategories } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.loadCards();
  }
  render() {
    console.log('UserHomepage: ', this.props.cards);
    return (
      <div className="UserHomepage">
      <h1>User Home</h1>
         <div className="cards-by-category">
          <CardsList cards={this.props.cards}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cardsList,
    categories: state.categoriesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCards: () => {
      dispatch(loadCards())
    },
    loadCategories: () => {
      dispatch(loadCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomepage);
