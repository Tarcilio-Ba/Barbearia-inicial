module.exports = app => {
    app.post('/signup', app.api.barbearia.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/barbearias')
        .all(app.config.passport.authenticate())
        .post(app.api.barbearia.save)
        .get(app.api.barbearia.get)

    app.route('/barbearias/:Codbarbearia')
        .all(app.config.passport.authenticate())
        .put(app.api.barbearia.save)
        .get(app.api.barbearia.getById)

    app.route('/barbeiros')
        .all(app.config.passport.authenticate())
        .post(app.api.barbeiro.save)
        .get(app.api.barbeiro.get)

    app.route('/barbeiros/:Codbarbeiro')
        .all(app.config.passport.authenticate())
        .put(app.api.barbeiro.save)
        .get(app.api.barbeiro.getById)
        .delete(app.api.barbeiro.remove)

    app.route('/itens')
        .all(app.config.passport.authenticate())
        .post(app.api.item.save)
        .get(app.api.item.get)

    app.route('/itens/:Coditem')
        .all(app.config.passport.authenticate())
        .get(app.api.item.getById)
        .put(app.api.item.save)
        .delete(app.api.item.remove)

    app.route('/itemvendas')
        .all(app.config.passport.authenticate())
        .post(app.api.itemvenda.save)
        .get(app.api.itemvenda.get)

    app.route('/itemvendas/:Coditemvenda')
        .all(app.config.passport.authenticate())
        .get(app.api.itemvenda.getById)
        .put(app.api.itemvenda.save)
        .delete(app.api.itemvenda.remove)

    app.route('/clientes')
        .all(app.config.passport.authenticate())
        .post(app.api.cliente.save)
        .get(app.api.cliente.get)

    app.route('/clientes/:Codcliente')
        .all(app.config.passport.authenticate())
        .get(app.api.cliente.getById)
        .put(app.api.cliente.save)
        .delete(app.api.cliente.remove)

    app.route('/vendas')
        .all(app.config.passport.authenticate())
        .post(app.api.venda.save)
        .get(app.api.venda.get)

    app.route('/vendas/:Codvenda')
        .all(app.config.passport.authenticate())
        .get(app.api.venda.getById)
        .put(app.api.venda.save)
        .delete(app.api.venda.remove)

    app.route('/agendamentos')
        .all(app.config.passport.authenticate())
        .post(app.api.agendamento.save)
        .get(app.api.agendamento.get)

    app.route('/agendamentos/:Codagendamento')
        .all(app.config.passport.authenticate())
        .get(app.api.agendamento.getById)
        .put(app.api.agendamento.save)
        .delete(app.api.agendamento.remove)

}
