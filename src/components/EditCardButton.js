import React from 'react';

let styles = {
  fontSize: '1.5rem',
  backgroundColor: 'green',
  padding: '15px',
  border: '1px solid #000',
  color: 'white',
};

const EditCardButton = props => {
  return (
    <button
      style={styles}
      onClick={props.clickHandler}
      disabled={props.disable}
    >
      {props.label || 'Click Me'}
    </button>
  );
};

export default EditCardButton;
