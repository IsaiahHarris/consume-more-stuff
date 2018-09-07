import React from 'react';

const EditCardButton = props => {
  return (
    <button onClick={props.clickHandler} disabled={props.disable}>edit</button>
  )
}
export default EditCardButton;