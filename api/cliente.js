module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const cliente = {...req.body}
        if(req.params.Codcliente) cliente.Codcliente = req.params.Codcliente
        
        try {
            existsOrError(cliente.nome, 'Nome não informado.')
            existsOrError(cliente.cpf, 'Cpf não informado.')
            existsOrError(cliente.email, 'Email não informado.')
            existsOrError(cliente.telefone, 'Telefone não informado.')
        } catch(msg){
            return res.status(400).send(msg)
        }
        
        if(cliente.Codcliente){
            app.db('clientes')
                .update(cliente)
                .where({Codcliente: cliente.Codcliente})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else {
            app.db('clientes')
                .insert(cliente)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    const remove = async(req, res) => {
        try{
            const rowsDeleted = await app.db('clientes')
                .where({Codcliente: req.params.Codcliente}).del()
            existsOrError(rowsDeleted, 'Cliente não foi encontrado')
            notExistsOrError(rowsDeleted, 'Cliente removido com sucesso.')
            
            res.status(204).send()
        }catch(msg){
            res.status(500).send(msg)
        }
    }
    const get = (req, res) => {
        app.db('clientes')
            .then(clientes => res.json(clientes))
            .catch(err => res.status(500).send(err))
    }
    const getById = (req, res) => {
        app.db('clientes')
            .where({Codcliente: req.params.Codcliente})
            .first()
            .then(cliente => res.json(cliente))
            .catch(err => res.status(500).send(err))
    }
    return{save, remove, get, getById}
}