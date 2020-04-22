
exports.up = function(knex, Promise) {
    return knex.schema.createTable('itens', table => {
        table.increments('Coditem').notNull()
        table.string('nome').notNull()
        table.string('tipo').notNull()
        table.integer('quantidade').notNull()
        table.float('preco',[5],[2]).notNull()
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('itens')
};
