import React from 'react';

let styles = {
  cursor: 'pointer',
  fontSize: '18px',
  padding: '5px',
  width: '100px',
  border: '1px solid black'
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
