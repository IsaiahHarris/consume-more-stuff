
exports.seed = function (knex, Promise) {
  // Delete entries in the items table
  return knex('items').del()
    .then(function () {
      // Delete entries in the users table
      return knex('users').del()
        .then(function () {
          // Delete entries in categories table
          return knex('categories').del()
            .then(function () {
              // Inserts seed entries for categories
              return knex('categories').insert([
                { id: 1, name: 'Vehicles' },
                { id: 2, name: 'Computers' },
                { id: 3, name: 'Appliances' },
                { id: 4, name: 'Furniture' },
              ]);
            });
        })
    })
};
