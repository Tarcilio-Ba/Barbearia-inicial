module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation


    const save = (req, res) => {
        const barbeiro = {...req.body}
        if(req.params.Codbarbeiro) barbeiro.Codbarbeiro = req.params.Codbarbeiro

        try {
            existsOrError(barbeiro.nome, 'Nome não informado.')
            existsOrError(barbeiro.email, 'Email não informado.')
            existsOrError(barbeiro.endereco, 'Endereco não informado.')
            existsOrError(barbeiro.telefone, 'Telefone não informado')
        } catch(msg){
            return res.status(400).send(msg)
        }

        if(barbeiro.Codbarbeiro){
            app.db('barbeiros')
                .update(barbeiro)
                .where({Codbarbeiro: barbeiro.Codbarbeiro})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('barbeiros')
                .insert(barbeiro)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    
        const remove = async (req, res) => {
            try{
                const rowsDeleted = await app.db('barbeiros')
                    .where({Codbarbeiro: req.params.Codbarbeiro}).del()
                existsOrError(rowsDeleted, 'Barbeiro não foi encontrado')
                notExistsOrError(rowsDeleted, 'Barbeiro removido com sucesso.')
                
                res.status(204).send()
            }catch(msg) {
                res.status(500).send(msg)
            }
        }


    
    
    const get = (req, res) => {
        app.db('barbeiros')
            .then(barbeiros => res.json(barbeiros))
            .catch(err => res.status(500).send(err))
     
    }
    const getById = (req, res) => {
        app.db('barbeiros')  
            .where({Codbarbeiro: req.params.Codbarbeiro})
            .first()
            .then(barbeiro => res.json(barbeiro))
            .catch (err => res.status(500).send(err))
    }
    return{save, remove, get, getById}
}