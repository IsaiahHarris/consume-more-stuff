import React from 'react';
import { Link } from 'react-router-dom';
let styles = {
  fontSize: '1.5rem',
  backgroundColor: 'green',
  padding: '15px',
  border: '1px solid #000',
  color: 'white',
  marginLeft: '15px'
}

const AddCardButton = props => {
  return (
    <button
      style={styles}
      onClick={props.clickHandler}
    >{props.label || 'Click Me'}
    </button>
  )
}

export default AddCardButton;