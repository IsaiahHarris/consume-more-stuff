
exports.up = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE items_id_seq RESTART WITH 40');
};

exports.down = function(knex, Promise) {
  return knex.raw('ALTER SEQUENCE items_id_seq RESTART WITH 1');
};
