module.exports = app => {
    const {existsOrerror, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const agendamento = {...req.body}
        if(req.params.Codagendamento) agendamento.Codagendamento = req.params.Codagendamento
    
        try {
            existsOrerror(agendamento.data, 'Data não informada.')
            existsOrerror(agendamento.hora, 'Horário não informado.')
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(agendamento.Codagendamento){
            app.db('agendamentos')
                .update(agendamento)
                .where({Codagendamento: agendamento.Codagendamento})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else {
            app.db('agendamentos')
                .insert(agendamento)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    
    }

    const remove = async (req, res) => {
        try {
            existsOrerror(req.params.Codagendamento, 'Código do agendamento não informado.')
            
            const cliente = await app.db('agendamentos')
                .where({clienteId: req.params.Codcliente})
            notExistsOrError(cliente, 'Agendamento possui clientes.')

            const barbearia = await app.db('agendamentos')
                .where({barbeariaId: req.params.Codbarbearia})
            notExistsOrError(barbearia, 'Agendamento possui barbearia relacionada.')
            
            const barbeiro = await app.db('agendamentos')
                .where({barbeiroId: req.params.Codbarbeiro})
            notExistsOrError(barbeiro, 'Agendamento possui um barbeiro relacionado.')

            const item = await app.db('agendamentos')
                .where({itemId: app.params.Coditem})
            notExistsOrError(item, 'Agendamento possui um serviço relacionado.')

            const rowsDeleted = await app.db('agendamentos')
                .where({Codagendamento: req.params.Codagendamento})
            existsOrError(rowsDeleted, 'Agendamento não encontrado.')
        
            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('agendamentos')
            .then(agendamentos => res.json(agendamentos))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('agendamentos')
            .where({Codagendamento: req.params.Codagendamento})
            .first()
            .then(agendamento => res.json(agendamento))
            .catch(err => res.status(500).send(err))
    }

    return {save, remove, get, getById}
}