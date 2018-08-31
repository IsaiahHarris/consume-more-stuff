
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'user1', password: '$2b$12$hXjHfNaqL3WNmv/MWPUTQ.HNW.pgsc2p0bR2j1/dmNYjyhT5pY6eG', email: 'lawyer@gmail.com', user_status_id: 1 },
        { id: 2, username: 'user2', password: '$2b$12$leYxtZ.Ze.ADWgwejW5j.O612I.4DZZda0BVeqppGCSOMQ65J18ke', email: 'adidas@gmail.com', user_status_id: 1 },
        { id: 3, username: 'user3', password: '$2b$12$6hHCnst/9Znrywkm.FGy3uHdF14ze2sA0Y03V1Yug26SiC8kKVCCG', email: 'sweetpotato@gmail.com', user_status_id: 1 },
      ]);
    });
};
