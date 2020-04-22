
exports.up = function (knex, Promise) {
    return knex.schema.createTable('itemvendas', table => {
        table.increments('Coditemvenda').notNull()
        table.integer('itemId').references('Coditem')
            .inTable('itens').notNull()
        table.integer('vendaId').references('Codvenda')
            .inTable('vendas').notNull()
        table.integer('qtvenda').notNull()
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('itemvendas')
};
