
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {title: 'Nissan Maxima', price: '$3.50', manufacturer:'Nissan',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/PCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1478719272289.png', seller_id: 1, category_id: 1, item_status_id: 1, condition_id: 2},
        {title: 'Cadillac XTS', price: '$10.50', manufacturer:'Cadillac',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/LCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1444354848672.png', seller_id: 2, category_id: 1, item_status_id: 1, condition_id: 1},
        {title: 'Toyota Camry', price: '$15.50', manufacturer:'Toyota',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/FCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1512427466575.png', seller_id: 3, category_id: 1, item_status_id: 1, condition_id: 1},
        {title: 'Infiniti Q50', price: '$6.50', manufacturer:'Infiniti',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/GXAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1444354956451.png', seller_id: 1, category_id: 1, item_status_id: 1, condition_id: 2},
        {title: 'Ford Mustang', price: '$2.50', manufacturer:'Ford',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/STAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1481644839629.png', seller_id: 2, category_id: 1, item_status_id: 1, condition_id: 1},
        {title: 'Chevrolet Impala', price: '$3.50', manufacturer:'Chevrolet',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/PXAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1444916528526.png', seller_id: 3, category_id: 1, item_status_id: 1, condition_id: 3},
        {title: 'HP - Pavilion x360 2-in-1 14" Touch-Screen Laptop', price: '$3.50', manufacturer:'HP',  details: 'Cool Computer', image_url:'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6240/6240845_sd.jpg;maxHeight=200;maxWidth=300', seller_id: 3, category_id: 2, item_status_id: 1, condition_id: 2},
        {title: 'Apple - MacBook Air® - 13.3" Display', price: '$3.50', manufacturer:'Apple',  details: 'Cool Computer', image_url:'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5465/5465502_sa.jpg;maxHeight=333;maxWidth=333', seller_id: 1, category_id: 2, item_status_id: 1, condition_id: 1},
      ]);
    });
};
