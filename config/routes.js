module.exports = app =>{
    app.route('/barbearias')
        .post(app.api.barbearia.save)
        .get(app.api.barbearia.get)
    
    app.route('/barbearias/:Codbarbearia')
        .put(app.api.barbearia.save)
        .get(app.api.barbearia.getById)
    
    app.route('/barbeiros')
        .post(app.api.barbeiro.save)
        .get(app.api.barbeiro.get)
    
    app.route('/barbeiros/:Codbarbeiro')
        .put(app.api.barbeiro.save)
        .get(app.api.barbeiro.getById)
        .delete(app.api.barbeiro.remove)

    app.route('/itens')
        .post(app.api.item.save)
        .get(app.api.item.get)
        
    app.route('/itens/:Coditem')
        .get(app.api.item.getById)
        .put(app.api.item.save)
        .delete(app.api.item.remove)

    app.route('/itemvendas')
        .post(app.api.itemvenda.save)
        .get(app.api.itemvenda.get)

    app.route('/itemvendas/:Coditemvenda')
        .get(app.api.itemvenda.getById)
        .put(app.api.itemvenda.save)
        .delete(app.api.itemvenda.remove)

    app.route('/clientes')
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)
    
    app.route('/clientes/:Codcliente')
        .get(app.api.cliente.getById)
        .put(app.api.cliente.save)
        .delete(app.api.cliente.remove)

    app.route('/vendas')
        .post(app.api.venda.save)
        .get(app.api.venda.get)
    
    app.route('/vendas/:Codvenda')
        .get(app.api.venda.getById)
        .put(app.api.venda.save)
        .delete(app.api.venda.remove)
    
    app.route('/agendamentos')
        .post(app.api.agendamento.save)
        .get(app.api.agendamento.get)

    app.route('/agendamentos/:Codagendamento')
        .get(app.api.agendamento.getById)
        .put(app.api.agendamento.save)
        .delete(app.api.agendamento.remove)

    }
