import React from 'react';
import './CardsByCategory.css';
import { connect } from 'react-redux';
import { loadCardsByCategory } from '../../actions';
import CardsList from '../CardsList';

class CardsByCategory extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCardsByCategory(this.props.match.params.categoryId)
  }

  render() {
    if (this.props.cardsByCategory.length !== 0) {
      return (
        <div className="cards-by-category">
          <CardsList categoryId={this.props.match.params.categoryId} cardsByCategory={this.props.cardsByCategory} />
        </div>
      )
    } else {
      return (
        <div>404</div>
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    cardsByCategory: state.cardsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCardsByCategory: category => {
      dispatch(loadCardsByCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardsByCategory)