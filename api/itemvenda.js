module.exports = app => {
    const {existsOrError, notExistsOrError} = app.api.validation

    const save = (req, res) => {
        const itemvenda = {...req.body}

    if(req.params.Coditemvenda) itemvenda.Coditemvenda = req.params.Coditemvenda
    
    try{
        existsOrError(itemvenda.itemId, 'Código do item não informado.')
        existsOrError(itemvenda.vendaId, 'Código da venda não informado.')
        existsOrError(itemvenda.qtvenda, 'Quantidade não informado.')
    } catch(msg){
        return res.status(400).send(msg)
    }

    if(itemvenda.Coditemvenda){
        app.db('itemvendas')
            .update(itemvenda)
            .where({Coditemvenda: itemvenda.Coditemvenda})
            .then(_=> res.status(204).send())
            .catch(err => res.status(500).send(err))
    }else{
        app.db('itemvendas')
            .insert(itemvenda)
            .then(_=> res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

}
    const remove = async (req, res) => {
        
        try {

            const subitem = await app.db('itens')
                .where({itemId: req.params.Coditem})
            existsOrError(subitem, 'Item não pode ser removido.')

            const venda = await app.db('vendas')
                .where({vendaId: req.params.Codvenda})
            existsOrError(venda, 'Item não pode ser removido.')

            const rowsDeleted = await app.db('itemvendas')
                .where({Coditemvenda: req.params.Coditemvenda}).del()
            existsOrError(rowsDeleted, 'Código não encontrado.')
            notExistsOrError(rowsDeleted, 'Item removido com sucesso.')
            
            res.status(204).send()
        }catch(msg){
            res.status(400).send(msg)
        }

    }

    const get = (req, res) => {
        app.db('itemvendas')
            .then(itemvendas => res.json(itemvendas))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res ) => {
        app.db('itemvendas')
            .where({Coditemvenda: req.params.Coditemvenda})
            .first()
            .then(itemvenda => res.json(itemvenda))
            .catch(err => res.status(500).send(err))
    }
    return {save, remove, get, getById}
}