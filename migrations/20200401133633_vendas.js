
exports.up = function(knex, Promise) {
    return knex.schema.createTable('vendas', table => {
        table.increments('Codvenda').notNull()
        table.integer('clienteId').references('Codcliente')
            .inTable('clientes').notNull()
        table.integer('barbeariaId').references('Codbarbearia')
            .inTable('barbearias').notNull()        

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('vendas')
};
