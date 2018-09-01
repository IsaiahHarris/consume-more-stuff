import React, { Component } from 'react';
import './Sidebar.css';
import Button from '../Button';
import { connect } from 'react-redux';
import { loadCategories } from '../../actions';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoriesMobileListCollection: document.getElementsByClassName(
        'Sidebar-categories-mobile-details'
      )
    };

    this.toggleCategoriesView = this.toggleCategoriesView.bind(this);
  }

  toggleCategoriesView() {
    this.state.categoriesMobileListCollection[0].classList.contains('hidden')
      ? this.state.categoriesMobileListCollection[0].classList.remove('hidden')
      : this.state.categoriesMobileListCollection[0].classList.add('hidden');
  }

  componentDidMount() {
    this.props.loadCategories()
  }
  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-auth-display">
          <div className="Sidebar-auth-display-options">Messages</div>
          <div className="Sidebar-auth-display-options">Settings</div>
          <Button label="Add" />
        </div>

        {/* Display for Desktop View: */}
        <div className="Sidebar-categories-desktop">
          Categories
          <ul className="Sidebar-categories-desktop-list">
            {this.props.categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className="Sidebar-categories-desktop-list-item"
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
          <Button label="ALL" />
        </div>

        {/* Display for Mobile View: */}
        <div
          className="Sidebar-categories-mobile"
          onClick={this.toggleCategoriesView}
        >
          Categories
        </div>
        <div
          className="Sidebar-categories-mobile-details hidden"
          onClick={this.toggleCategoriesView}
        >
          <div
            className="Sidebar-categories-mobile-details-inner"
            onClick={stopEventPropagation}
          >
            <ul className="Sidebar-categories-mobile-details-inner-list">
              {this.props.categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    className="Sidebar-categories-mobile-details-inner-list-item"
                  >
                    {category.name}
                  </li>
                );
              })}
            </ul>
            <Button label="ALL" />
          </div>
        </div>
      </div>
    );
  }
}

function stopEventPropagation(event) {
  event.stopPropagation();
}

const mapStateToProps = state => {
  return {
    cards: state.cardsList,
    categories: state.categoriesList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => {
      dispatch(loadCategories())
    },

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
