import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCards, loadCategories } from '../../actions';

import './Body.css';
import Row from '../Row';

class Body extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.loadCards();
    this.props.loadCategories();
  }

  render() {
    console.log('this.props.categories', this.props.categories);
    console.log('this.props.cards', this.props.cards);
    return <div className="Body">
      <Row />
    </div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(Body);
