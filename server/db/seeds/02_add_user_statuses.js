
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('user_statuses').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_statuses').insert([
        { name: 'active' },
        { name: 'inactive' },
      ]);
    });
};
