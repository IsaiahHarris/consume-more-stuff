
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'user1', password: 'password', email: 'lawyer@gmail.com', user_status_id: 1 },
        { username: 'user2', password: 'password', email: 'adidas@gmail.com', user_status_id: 1 },
        { username: 'user3', password: 'password', email: 'sweetpotato@gmail.com', user_status_id: 1 },
      ]);
    });
};
