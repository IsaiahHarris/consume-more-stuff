import React from 'react';
import Card from '../Card';
import './CardsList.css';

const CardsList = props => {
  if (props.cardsByCategory) {
    // Display for categories page:
    return (
      <div className="cards-list-container">
        {props.cardsByCategory.map((card, i) => {
          const conditionName =
            card && card.condition ? card.condition.name : null;
          const sellerName = card && card.seller ? card.seller.username : null;
          const categoryName =
            card && card.category ? card.category.name : null;
          const itemStatusName =
            card && card.itemStatus ? card.itemStatus.name : null;
          return (
            <Card
              key={i}
              title={card.title}
              photo={card.image_url}
              price={card.price}
              condition={conditionName}
              manufacturer={card.manufacturer}
              dimensions={card.dimensions}
              details={card.details}
              seller={sellerName}
              category={categoryName}
              status={itemStatusName}
              id={card.id}
              card={card}
            />
          );
        })}
      </div>
    );
  } else if (props.cards) {
    // Display for unauthorized user home page:
    return (
      <div className="cards-list-container">
        {props.cards.slice(0, 4).map((card, i) => {
          const conditionName =
            card && card.condition ? card.condition.name : null;
          const sellerName = card && card.seller ? card.seller.username : null;
          const categoryName =
            card && card.category ? card.category.name : null;
          const itemStatusName =
            card && card.itemStatus ? card.itemStatus.name : null;
          return (
            <Card
              key={i}
              title={card.title}
              photo={card.image_url}
              price={card.price}
              condition={conditionName}
              manufacturer={card.manufacturer}
              dimensions={card.dimensions}
              details={card.details}
              seller={sellerName}
              category={categoryName}
              status={itemStatusName}
              id={card.id}
              card={card}
            />
          );
        })}
      </div>
    );
  } else if (props.userCards) {
    // Display for authortized user home page/inventory:
    return (
      <div className="cards-list-container">
        {props.userCards.map((card, i) => {
          const conditionName =
            card && card.condition ? card.condition.name : null;
          const sellerName = card && card.seller ? card.seller.username : null;
          const categoryName =
            card && card.category ? card.category.name : null;
          const itemStatusName =
            card && card.itemStatus ? card.itemStatus.name : null;
          return (
            <Card
              key={i}
              title={card.title}
              photo={card.image_url}
              price={card.price}
              condition={conditionName}
              manufacturer={card.manufacturer}
              dimensions={card.dimensions}
              details={card.details}
              seller={sellerName}
              category={categoryName}
              status={itemStatusName}
              id={card.id}
              card={card}
            />
          );
        })}
      </div>
    );
  }
};

export default CardsList;
