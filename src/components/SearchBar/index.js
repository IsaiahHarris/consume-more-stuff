import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrap">
        <div className="search-bar-container">
          <input type="text" className="search-term" placeholder="Search Item" />
          <div type="submit" className="search-button">
            go
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;