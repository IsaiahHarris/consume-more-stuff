import React from 'react';
import CardsList from '../CardsList';
import './Row.css'
class Row extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="row-container">
        <div className="label">label</div>
        <CardsList />
      </div>
    )
  }
}

export default Row;