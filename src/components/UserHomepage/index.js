import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCardsBySold } from '../../actions';
import CardsList from '../CardsList';

class UserHomepage extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.loadCardsBySold(1);
  }
  render() {
    console.log('UserHomepage: ', this.props.cards);
    return (
      <div className="UserHomepage">
      <h1>User Home</h1>
         <div className="cards-by-category">
          <CardsList cards={this.props.cards}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cards: state.userItemList,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCardsBySold: userId => {
      dispatch(loadCardsBySold(userId));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomepage);
