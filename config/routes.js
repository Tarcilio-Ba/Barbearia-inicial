const admin = require('./admin')


module.exports = app => {
    app.post('/signup', app.api.barbearia.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/barbearias')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.barbearia.save))
        .get(admin(app.api.barbearia.get))

    app.route('/barbearias/:Codbarbearia')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.barbearia.save))
        .get(admin(app.api.barbearia.getById))

    app.route('/barbeiros')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.barbeiro.save))
        .get(admin(app.api.barbeiro.get))

    app.route('/barbeiros/:Codbarbeiro')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.barbeiro.save))
        .get(app.api.barbeiro.getById)
        .delete(admin(app.api.barbeiro.remove))

    app.route('/itens')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.item.save))
        .get(admin(app.api.item.get))

    app.route('/itens/:Coditem')
        .all(app.config.passport.authenticate())
        .get(app.api.item.getById)
        .put(admin(app.api.item.save))
        .delete(admin(app.api.item.remove))

    app.route('/itemvendas')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.itemvenda.save))
        .get(admin(app.api.itemvenda.get))

    app.route('/itemvendas/:Coditemvenda')
        .all(app.config.passport.authenticate())
        .get(app.api.itemvenda.getById)
        .put(admin(app.api.itemvenda.save))
        .delete(admin(app.api.itemvenda.remove))

    app.route('/clientes')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.cliente.save))
        .get(admin(app.api.cliente.get))

    app.route('/clientes/:Codcliente')
        .all(app.config.passport.authenticate())
        .get(app.api.cliente.getById)
        .put(admin(app.api.cliente.save))
        .delete(admin(app.api.cliente.remove))

    app.route('/vendas')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.venda.save))
        .get(admin(app.api.venda.get))

    app.route('/vendas/:Codvenda')
        .all(app.config.passport.authenticate())
        .get(app.api.venda.getById)
        .put(admin(app.api.venda.save))
        .delete(admin(app.api.venda.remove))

    app.route('/agendamentos')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.agendamento.save))
        .get(admin(app.api.agendamento.get))

    app.route('/agendamentos/:Codagendamento')
        .all(app.config.passport.authenticate())
        .get(app.api.agendamento.getById)
        .put(admin(app.api.agendamento.save))
        .delete(admin(app.api.agendamento.remove))

}
