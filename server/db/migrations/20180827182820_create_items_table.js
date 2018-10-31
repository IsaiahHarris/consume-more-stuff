
exports.up = function (knex, Promise) {
  return knex.schema.createTable('items', table => {
    table.increments();
    table.string('title').notNullable();
    table.string('price');
    table.string('manufacturer');
    table.string('model');
    table.string('dimensions');
    table.text('details');
    table.string('image_url');
    table.timestamp('deleted_at');
    table.timestamps(true, true);
    table.integer('seller_id').references('users.id').notNullable();
    table.integer('category_id').references('categories.id').notNullable();
    table.integer('item_status_id').references('item_statuses.id').notNullable();
    table.integer('condition_id').references('conditions.id').notNullable();
  })
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('items');
};
