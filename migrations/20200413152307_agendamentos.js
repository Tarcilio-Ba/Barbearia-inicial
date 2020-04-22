
exports.up = function(knex, Promise) {
    return knex.schema.createTable('agendamentos', table => {
        table.increments('Codagendamento').primary()
        table.date('data').notNull()
        table.time('hora').notNull()
        table.integer('clienteId').references('Codcliente')
            .inTable('clientes').notNull()
        table.integer('barbeariaId').references('Codbarbearia')
            .inTable('barbearias').notNull()
        table.integer('barbeiroId').references('Codbarbeiro')
            .inTable('barbeiros').notNull()
        table.integer('itemId').references('Coditem')
            .inTable('itens').notNull()

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('agendamentos')
};