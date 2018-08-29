import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCards } from '../../actions';
import './Body.css';
import Row from '../Row';

class Body extends Component {
  constructor(props) {
    super(props)
    console.log('this.props', this.props);
  }
  render() {
    return <div className="Body">
      <Row label="" />
      <Row label="" />
      <Row label="" />
      <Row label="" />
    </div>;
  }
}

const mapStateToProps = state => {
  return {
    cards: state.cardsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCards: () => {
      dispatch(loadCards())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
