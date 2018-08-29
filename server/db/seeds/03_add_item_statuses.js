
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('item_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('item_statuses').insert([
        { name: 'published' },
        { name: 'sold' },
      ]);
    });
};
