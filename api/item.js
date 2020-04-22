module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = (req, res) => {
        const item = {...req.body }
        if (req.params.Coditem) item.Coditem = req.params.Coditem

        try {
            existsOrError(item.nome, 'Nome não informado.')
            existsOrError(item.tipo, 'Tipo não informada.')
            existsOrError(item.quantidade, 'Quantidade não informada.')
            existsOrError(item.preco, 'Valor não informado.')
        } catch(msg){
            return res.status(400).send(msg)
        }

        if (item.Coditem) {
            app.db('itens')
                .update(item)
                .where({Coditem: item.Coditem })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('itens')
                .insert(item)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('itens')
                .where({ Coditem: req.params.Coditem }).del()
            existsOrError(rowsDeleted, 'Item não foi encontrado')
            notExistsOrError(rowsDeleted, 'Item removido com sucesso.')
            res.status(204).send()
        
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('itens')
            .then(itens => res.json(itens))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('itens')
            .where({ Coditem: req.params.Coditem })
            .first()
            .then(item => res.json(item))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get, getById }


}