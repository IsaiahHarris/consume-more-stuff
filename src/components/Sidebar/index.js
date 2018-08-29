import React, { Component } from 'react';

import './Sidebar.css';
import Button from '../Button';

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

  render() {
    return (
      <div className="Sidebar">
        <div className="Sidebar-auth-display">
          <div className="Sidebar-auth-display-options">Messages</div>
          <div className="Sidebar-auth-display-options">Settings</div>
        </div>

        <div className="Sidebar-categories-desktop">
          Categories
          <ul className="Sidebar-categories-desktop-list">
            <li className="Sidebar-categories-desktop-list-item">
              Vehicles
            </li>
            <li className="Sidebar-categories-desktop-list-item">
              Computers
            </li>
            <li className="Sidebar-categories-desktop-list-item">
              Appliances
            </li>
            <li className="Sidebar-categories-desktop-list-item">
              Furniture
            </li>
          </ul>
          <Button label="ALL" />
        </div>

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
              <li className="Sidebar-categories-mobile-details-inner-list-item">
                Vehicles
              </li>
              <li className="Sidebar-categories-mobile-details-inner-list-item">
                Computers
              </li>
              <li className="Sidebar-categories-mobile-details-inner-list-item">
                Appliances
              </li>
              <li className="Sidebar-categories-mobile-details-inner-list-item">
                Furniture
              </li>
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
