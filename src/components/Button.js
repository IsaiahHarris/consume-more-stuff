import React from 'react';

let styles = {
  cursor: 'pointer',
  fontSize: '1.5rem',
  padding: '15px',
  border: 0,
  backgroundColor: 'transparent'
};

const Button = props => {
  if (props.customStyles) {
    styles = Object.assign({}, styles, props.customStyles);
  }

  return (
    <button style={styles} onClick={props.clickHandler}>
      {props.label || 'Click Me'}
    </button>
  );
};

export default Button;
