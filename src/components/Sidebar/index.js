import React, { Component } from 'react';

import './Sidebar.css';
import Button from '../Button';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: ['Vehicles', 'Computers', 'Appliances', 'Furniture'],
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

  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-auth-display">
          <div className="Sidebar-auth-display-options">Messages</div>
          <div className="Sidebar-auth-display-options">Settings</div>
        </div>

        {/* Display for Desktop View: */}
        <div className="Sidebar-categories-desktop">
          Categories
          <ul className="Sidebar-categories-desktop-list">
            {this.state.categories.map((category, index) => {
              return (
                <li
                  key={index}
                  className="Sidebar-categories-desktop-list-item"
                >
                  {category}
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
              {this.state.categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    className="Sidebar-categories-mobile-details-inner-list-item"
                  >
                    {category}
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

export default Sidebar;
