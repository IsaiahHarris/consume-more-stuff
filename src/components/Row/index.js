import React from 'react';
import CardsList from '../CardsList';
import './Row.css'
const Row = props => {
  return (
    <div className="row-container">
      <div className="label">{props.label}</div>
      <CardsList />
    </div>
  )
}

export default Row;