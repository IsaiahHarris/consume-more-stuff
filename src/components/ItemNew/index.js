import React, { Component } from 'react';

import './ItemNew.css';
import Button from '../Button';

class ItemNew extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
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
          <div className="item-title"></div>
          <div className="seller"></div>
        </div>
        <div className="add-button-container">
          <Button label='Add Photo' />
        </div>
        <div className="item-details-container">
          <div className="item-price">Price: </div>
          <div className="item-condition">Condition: </div>
          <div className="item-manufacturer">Make: </div>
          <div className="item-model">Model: </div>
          <div className="item-dimensions">dimensions: </div>
          <div className="item-note">Note: </div>
        </div>
      </div>
    )
  }
}

export default ItemNew;
