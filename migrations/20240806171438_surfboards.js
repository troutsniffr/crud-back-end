/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('surfboards', table => {
        table.increments('id').primary();
        table.integer('userid')
        table.foreign('userid').references('id').inTable('users').onDelete('SET NULL');
        table.string('type').notNullable();
        table.string('style');
        table.string('brand');
        table.string('model');
        table.string('length');
        table.string('dimensions');
        table.float('volume');
        table.string('fins');
        table.text('description');
        table.decimal('price', 8, 2);
        table.integer('quantity').notNullable();
        table.boolean('is_sold').defaultTo(false);
        table.string('image_url');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("surfboards");
};
