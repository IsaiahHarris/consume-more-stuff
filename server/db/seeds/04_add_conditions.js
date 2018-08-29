
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('conditions').del()
    .then(function () {
      // Inserts seed entries
      return knex('conditions').insert([
        { id: 1, name: 'new', rank: 1 },
        { id: 2, name: 'good', rank: 2 },
        { id: 3, name: 'fair', rank: 3 },
        { id: 4, name: 'worn', rank: 4 },
        { id: 5, name: 'used', rank: 5 },
      ]);
    });
};
