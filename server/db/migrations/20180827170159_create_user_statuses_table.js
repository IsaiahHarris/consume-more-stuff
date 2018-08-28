
exports.up = function (knex, Promise) {
  return knex.schema.createTable('user_statuses', table => {
    table.increments();
    table.string('name').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('user_statuses');
};
