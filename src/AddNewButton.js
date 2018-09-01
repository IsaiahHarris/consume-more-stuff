import React from 'react';
import { Link } from 'react-router-dom';
let styles = {
  fontSize: '1.5rem',
  backgroundColor: 'green',
  padding: '15px',
  borderRadius: '50%',
  color: 'white',
  border: 0,
  marginLeft: '15px'
}

const AddCardButton = props => {
  return (
    <Link to="/">
      <button
        style={styles}
        onClick={props.clickHandler}
      >{props.label || 'Click Me'}
      </button>
    </Link>
  )
}

export default AddCardButton;