import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)

  }
  // componentDidMount() {
  //   this.props.loadCard(4)
  //   console.log('this.props.after', this.props);
  // }
  render() {
    console.log('this.props item DETAIL', this.props);
    const {
      title,
      price,
      manufacturer,
      model,
      dimensions,
      details,
      photo,
      seller,
      category,
      status,
      condition
    } = this.props.location.state
    return (
      <div className="item-detail-view">
        <div className="hi">{title}</div>
      </div>
    )
  }
}

// const mapStateToProps = state => {
//   console.log('state', state);
//   return {
//     card: state.cardsList,
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     loadCard: card => {
//       dispatch(loadCard(card))
//     }
//   }
// }

export default ItemDetail;