
exports.seed = function (knex, Promise) {
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries for categories
      return knex('categories').insert([
        { name: 'vehicles' },
        { name: 'computers' },
        { name: 'appliances' },
        { name: 'furnitures' },
      ]);
    });
};
