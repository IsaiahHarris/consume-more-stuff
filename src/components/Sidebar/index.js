import React, { Component } from 'react';
import './Sidebar.css';
import Button from '../Button';
import { connect } from 'react-redux';
import { loadCategories } from '../../actions';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mainMobileListCollection: document.getElementsByClassName(
        'Sidebar-main-mobile-details'
      )
    };

    this.toggleMobileCategoriesList = this.toggleMobileCategoriesList.bind(
      this
    );
  }

  toggleMobileCategoriesList() {
    this.state.mainMobileListCollection[0].classList.contains('hidden')
      ? this.state.mainMobileListCollection[0].classList.remove('hidden')
      : this.state.mainMobileListCollection[0].classList.add('hidden');
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  render() {
    return (
      <div className="Sidebar">
        {this.props.user.username && (
          <div className="Sidebar-auth-display">
            <Link to={'/user/settings'}>
              <div className="Sidebar-auth-display-options">Settings</div>
            </Link>
            <Link to={'/inventory'}>
              <span>Inventory</span>
            </Link>
            <Link to={'/items/new'}>
              <Button label="ADD" />
            </Link>
          </div>
        )}
        {/* Display for Desktop View: */}
        <div className="Sidebar-main-desktop">
          <div className="Sidebar-main-desktop-home">
            <Link to={'/'}>
              <span>Home</span>
            </Link>
          </div>
          <ul className="Sidebar-main-desktop-list">
            <span>Categories</span>
            {this.props.categories.map((category, index) => {
              return (
                <li key={index} className="Sidebar-main-desktop-list-item">
                  <Link to={`/items/category/${category.id}`}>
                    {category.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link to={'/'}>
            <Button label="ALL" />
          </Link>
        </div>

        {/* Display for Mobile View: */}
        <div className="Sidebar-main-mobile">
          <Link to={'/'}>
            <span>Home</span>
          </Link>{' '}
          <span onClick={this.toggleMobileCategoriesList}>Categories</span>
        </div>
        <div
          className="Sidebar-main-mobile-details hidden"
          onClick={this.toggleMobileCategoriesList}
        >
          <div
            className="Sidebar-main-mobile-details-inner"
            onClick={stopEventPropagation}
          >
            <ul className="Sidebar-main-mobile-details-inner-list">
              {this.props.categories.map((category, index) => {
                return (
                  <li
                    key={index}
                    className="Sidebar-main-mobile-details-inner-list-item"
                  >
                    <Link to={`/items/category/${category.id}`}>
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link to={'/'}>
              <Button label="ALL" />
            </Link>
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
    categories: state.categoriesList,
    user: state.usersList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCategories: () => {
      dispatch(loadCategories());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
