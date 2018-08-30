
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        //-- Vehicles --//
        { id: 1, title: 'Nissan Maxima', price: '$3.50', manufacturer:'Nissan',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/PCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1478719272289.png', seller_id: 1, category_id: 1, item_status_id: 1, condition_id: 2},
        { id: 2, title: 'Cadillac XTS', price: '$10.50', manufacturer:'Cadillac',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/LCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1444354848672.png', seller_id: 2, category_id: 1, item_status_id: 1, condition_id: 1},
        { id: 3, title: 'Toyota Camry', price: '$15.50', manufacturer:'Toyota',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/FCAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1512427466575.png', seller_id: 3, category_id: 1, item_status_id: 1, condition_id: 1},
        { id: 4, title: 'Infiniti Q50', price: '$6.50', manufacturer:'Infiniti',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/GXAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1444354956451.png', seller_id: 1, category_id: 1, item_status_id: 1, condition_id: 2},
        { id: 5, title: 'Ford Mustang', price: '$2.50', manufacturer:'Ford',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/STAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1481644839629.png', seller_id: 2, category_id: 1, item_status_id: 1, condition_id: 1},
        { id: 6, title: 'Chevrolet Impala', price: '$3.50', manufacturer:'Chevrolet',  details: 'Nice Car', image_url:'https://assets.gcs.ehi.com/content/enterprise_cros/data/vehicle/bookingCountries/US/CARS/PXAR.doi.352.high.imageSmallThreeQuarterNodePath.png/1444916528526.png', seller_id: 3, category_id: 1, item_status_id: 1, condition_id: 3},
        //-- Computers --//
        { id: 7, title: 'HP - Pavilion x360 2-in-1 14" Touch-Screen Laptop', price: '$3.50', manufacturer:'HP',  details: 'Cool Computer', image_url:'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6240/6240845_sd.jpg;maxHeight=200;maxWidth=300', seller_id: 3, category_id: 2, item_status_id: 1, condition_id: 2},
        { id: 8, title: 'Apple - MacBook Air® - 13.3" Display', price: '$3.50', manufacturer:'Apple',  details: 'Cool Computer', image_url:'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5465/5465502_sa.jpg;maxHeight=333;maxWidth=333', seller_id: 1, category_id: 2, item_status_id: 1, condition_id: 1},
        { id: 9, title: 'Inspiron 24 3000', price: '$45.50', manufacturer:'Dell',  details: 'Cool Computer', image_url:'https://i.dell.com/sites/imagecontent/consumer/merchandizing/en/PublishingImages/magnum-category/aio/desktop-inspiron-22-3475-aio-169x121-touch.jpg', seller_id: 2, category_id: 2, item_status_id: 1, condition_id: 1},
        { id: 10, title: 'Inspiron 24 3000 Touch', price: '$300.50', manufacturer:'Dell',  details: 'Cool Computer', image_url:'https://i.dell.com/sites/imagecontent/consumer/merchandizing/en/PublishingImages/magnum-category/aio/desktop-inspiron-24-3477-aio-169x121-touch-wireless.jpg', seller_id: 1, category_id: 2, item_status_id: 1, condition_id: 1},
        { id: 11, title: 'Alienware Aurora', price: '$31.50', manufacturer:'Dell',  details: 'Cool Computer', image_url:'https://i.dell.com/sites/imagecontent/consumer/merchandizing/en/PublishingImages/magnum-category/aurora_r7_165x119_vr.png', seller_id: 2, category_id: 2, item_status_id: 1, condition_id: 1},
        { id: 12, title: 'Two iMacs', price: '$20.50', manufacturer:'Apple',  details: '2 X Cool Computers', image_url:'https://img.bbystatic.com/BestBuy_US/store/ee/2015/global/general/brands/Apple/imac-new.jpg', seller_id: 3, category_id: 2, item_status_id: 1, condition_id: 1},
        //-- Appliances --//
        { id: 13, title: 'Smart 4-Door Fingerprint Resistant Refrigerator - Stainless Steel', price: '$1799.50', manufacturer:'Bronson Inc.',  details: 'Useful', image_url:'https://c.shld.net/rpx/i/s/i/spin/10163617/prod_17796502112?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 1, category_id: 3, item_status_id: 1, condition_id: 1},
        { id: 14, title: 'Samsung Front-Load Dryer Bundle', price: '$1319.80', manufacturer:'Samsung',  details: 'Useful', image_url:'https://c.shld.net/rpx/i/s/i/spin/0/prod_2103221012?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 2, category_id: 3, item_status_id: 1, condition_id: 3},
        { id: 15, title: 'Kenmore Elite Smart Electric Dryer with Steam Refresh - Metallic Silver', price: '$839.90', manufacturer:'Bronson Inc.',  details: 'Useful', image_url:'https://c.shld.net/rpx/i/s/i/spin/10163617/prod_19097759212?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 3, category_id: 3, item_status_id: 1, condition_id: 1},
        { id: 16, title: 'Smart Wi-Fi Enabled Electric Dryer w/ TurboSteam™ Technology ', price: '$1489.50', manufacturer:'Bronson Inc.',  details: 'Useful', image_url:'https://c.shld.net/rpx/i/s/i/spin/10099713/prod_1902117212?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 1, category_id: 3, item_status_id: 1, condition_id: 1},
        { id: 17, title: 'TurboSteam™ Electric Dryer w/ EasyLoad™ Door – Graphite Steel', price: '$1699.50', manufacturer:'Bronson Inc.',  details: 'Useful', image_url:'https://c.shld.net/rpx/i/s/i/spin/10099713/prod_1489531612?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 2, category_id: 3, item_status_id: 1, condition_id: 1},
        { id: 18, title: 'Freestanding Gas Range - Stainless Steel', price: '$709.50', manufacturer:'Bronson Inc.',  details: 'Useful', image_url:'https://c.shld.net/rpx/i/s/i/spin/10038420/prod_12126174912?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 3, category_id: 3, item_status_id: 1, condition_id: 1},
        //-- Furnitures --//
        { id: 19, title: 'Walker Edison Furniture Company Solid Wood Cottage Slat Bunk Bed - Blue', price: '$35.50', manufacturer:'Ikea',  details: 'Sturdy Furniture', image_url:'https://c.shld.net/rpx/i/s/pi/mp/36562/prod_4321292126?src=http%3A%2F%2Fvirventures.com%2Fimage%2Fdata%2FVendor_images%2FWALK%2FBWTOTCOTBU.jpg&d=710b487a8fff90e17671ad7ccc91d2a1939d27ea&hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 1, category_id: 4, item_status_id: 1, condition_id: 1},
        { id: 20, title: 'Costway Electric Lift Power Chair Recliners Chair Remote Living Room Furniture Brown', price: '$27.50', manufacturer:'Ikea',  details: 'Sturdy Furniture', image_url:'https://c.shld.net/rpx/i/s/i/mp/10153191/prod_16447801324?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 2, category_id: 4, item_status_id: 1, condition_id: 2},
        { id: 21, title: 'Smedbo Shower Chair in White', price: '$300.50', manufacturer:'Ikea',  details: 'Sturdy Furniture', image_url:'https://c.shld.net/rpx/i/s/i/spin/10164060/prod_19395260212?hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 3, category_id: 4, item_status_id: 1, condition_id: 1},
        { id: 22, title: 'Acme Furniture Jade Collection 29109 14 Eastern King Size Pillow Top Mattress with Foam Encased ', price: '$43.50', manufacturer:'Ikea',  details: 'Sturdy Furniture', image_url:'https://c.shld.net/rpx/i/s/pi/mp/1457/prod_12285580918?src=http%3A%2F%2Fbt.cwa.sellercloud.com%2Fimages%2Fproducts%2F545550.jpg&d=a03c55318440cf2a54b252ffb3a41fc8374322f2&hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 1, category_id: 4, item_status_id: 1, condition_id: 3},
        { id: 23, title: 'Flash Furniture Stacking Dining Chair Color: Red', price: '$78.50', manufacturer:'Ikea',  details: 'Sturdy Furniture', image_url:'https://c.shld.net/rpx/i/s/pi/mp/10139695/prod_19010771807?src=http%3A%2F%2Fimg.wfrcdn.com%2Flf%2F8%2Fhash%2F11201%2F36732433%2F1%2F1%2F682809194.jpg&d=76dad34a6b500566fd728b341858a60bf77a96b8&hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 2, category_id: 4, item_status_id: 1, condition_id: 1},
        { id: 24, title: 'Best Choice Products Convertible Linen Upholstered Split Back Futon (Navy)', price: '$90.50', manufacturer:'Ikea',  details: 'Sturdy Furniture', image_url:'https://c.shld.net/rpx/i/s/pi/mp/24657/prod_12532088608?src=https%3A%2F%2Fdl.dropboxusercontent.com%2Fs%2Ftl34l7n6zamb3qj%2FSKY3640ebay-1.jpg&d=7190cff6a04736f64137ac390d5326a0b5421316&hei=245&wid=245&op_sharpen=1&qlt=85', seller_id: 3, category_id: 4, item_status_id: 1, condition_id: 1},
      ]);
    });
};
