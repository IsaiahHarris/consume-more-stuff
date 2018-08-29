
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('item_statuses').insert([
        {id: 1, name: 'published'},
        {id: 2, name: 'sold'},
      ]);
    });
};
