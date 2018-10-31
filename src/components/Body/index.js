import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCards, loadCategories } from '../../actions';
import './Body.css';
import Row from '../Row';

class Body extends Component {
  componentDidMount() {
    this.props.loadCards();
    this.props.loadCategories();
  }

  render() {
    return (
      <div className="Body">
        {this.props.categories.map((category, i) => {
          return <Row key={i} cards={this.props.cards} label={category.name} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cardsList,
    categories: state.categoriesList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCards: () => {
      dispatch(loadCards());
    },
    loadCategories: () => {
      dispatch(loadCategories());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
