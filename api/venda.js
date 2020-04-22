module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const venda = {
            Codvenda: req.body.venda,
            clienteId: req.body.clienteId,
            barbeariaId: req.body.barbeariaId
        }

        if(req.params.Codvenda) venda.Codvenda = req.params.Codvenda
        try{
            existsOrError(venda.clienteId, 'Código do cliente não informado.')
            existsOrError(venda.barbeariaId, 'Código da berbearia não informado.')
        }catch(msg){
            return res.status(400).send(msg)
        }
        if(venda.Codvenda){
            app.db('vendas')
                .update(venda)
                .where({Codvenda: venda.Codvenda})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }else{
            app.db('vendas')
                .insert(venda)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))

        }
    }
    const remove = async (req, res) => {
        try{
            existsOrError(req.params.Codvenda, 'Código da venda não informado.')

            const cliente = await app.db('clientes')
                .where({clienteId: req.params.Codcliente})
            notExistsOrError(cliente, 'Está venda possui cliente relacionado.')
            
            const barbearia = await app.db('barbearias')
                .where({barbeariaId: req.params.Codbarbearia})
            notExistsOrError(barbearia, 'Está venda possui barbearia relacionada.')
            
            const rowsDeleted = await app.db('vendas')
                .where({Codvenda: req.params.Codvenda}).del()
            existsOrError(rowsDeleted, 'Venda não encontrada.')
            
            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }
    } 
    
    const get = (req, res) => {
        app.db('vendas')
            .then(vendas => res.json(vendas))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res ) => {
        app.db('vendas')
            .where({Codvenda: req.params.Codvenda})
            .first()
            .then(venda => res.json(venda))
            .catch(err => res.status(500).send(err))
    }
    return {save, remove, get, getById}
}