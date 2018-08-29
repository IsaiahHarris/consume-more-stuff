import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className={this.props.classNameLabel} >
        <div className="search-bar-container">
          <input type="text" className="search-term" placeholder="   Search Item" />
          <div type="submit" className="search-button">
            <div className="go">Go</div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;

