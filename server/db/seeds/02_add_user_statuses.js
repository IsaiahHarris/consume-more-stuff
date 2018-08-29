
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_statuses').insert([
        {id: 1, name: 'active'},
        {id: 2, name: 'inactive'},
      ]);
    });
};
