import React from 'react';

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
    <button
      style={styles}
      onClick={props.clickHandler}
    >{props.label || 'Click Me'}
    </button>
  )
}

export default AddCardButton;