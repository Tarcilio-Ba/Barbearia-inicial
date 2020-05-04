
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('barbearias', table =>{
        table.timestamp('deleteAt')
    } )
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('barbearias', table => {
        table.dropColumn('deleteAt')
    })

};
