import React from 'react';
import { connect } from 'react-redux';
import { loadCard } from '../../actions';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props)
    console.log('this.propsbefore', this.props);
  }
  componentDidMount() {
    this.props.loadCard()
  }
  render() {
    console.log('this.propsafter', this.props);
    return (
      <div className="item-detail-view">
        <div className="hi">hiiii</div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    card: state.cardsList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCard: card => {
      dispatch(loadCard(1))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);