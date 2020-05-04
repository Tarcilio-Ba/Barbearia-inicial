const bcrypt = require('bcrypt-nodejs')

module.exports = app =>{
    const {existsOrError, notExistsOrError, equalsOrError} = app.api.validation

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) =>{
        const barbearia = { ...req.body } 
        if(req.params.Codbarbearia) barbearia.Codbarbearia = req.params.Codbarbearia
        try{
            existsOrError(barbearia.nome, 'Nome não informado')
            existsOrError(barbearia.endereco, 'Endereço não informado')
            existsOrError(barbearia.email, 'E-mail não informado')
            existsOrError(barbearia.telefone, 'Telefone não informado')
            existsOrError(barbearia.password, 'Senha não informada')
            existsOrError(barbearia.confirmPassword, 'Confirmação de senha inválida')
            existsOrError(barbearia.password, barbearia.confirmPassword, 'Senha inválidas.')
        
            const barbeariaFromDB = await app.db('barbearias')
                .where({email: barbearia.email}).first()
            if(!barbearia.Codbarbearia){
                notExistsOrError(barbeariaFromDB,'Usuário já cadastrado.')
            }

        } catch(msg){
            return res.status(400).send(msg)
        }
        barbearia.password = encryptPassword(barbearia.password)
        delete barbearia.confirmPassword

        if(barbearia.Codbarbearia){
            app.db('barbearias')
                .update(barbearia)
                .where({Codbarbearia: barbearia.Codbarbearia})
                .whereNull('deleteAt')
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('barbearias')
                .insert(barbearia)
                .then(_=> res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req,res) => {
        app.db('barbearias')
            .select('Codbarbearia','nome','endereco','email','telefone','admin')
            .whereNull('deleteAt')
            .then(barbearias => res.json(barbearias))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req,res) => {
        app.db('barbearias')
            .select('Codbarbearia','nome','endereco','email','telefone','admin')
            .where({Codbarbearia: req.params.Codbarbearia})
            .whereNull('deleteAt')
            .first()
            .then(barbearia => res.json(barbearia))
            .catch(err => res.status(500).send(err))

    }

    const remove = async (req, res) => {
        try{
            const agendamento = await app.db('agendamentos')
                .where({barbeariaId: req.params.Codbarbearia})
            notExistsOrError(agendamento, 'Barbearia possui agendamentos.')

            const rowsUpdated = await app.db('barbearias')
                .update({deleteAt: new Date()})
                .where({Codbarbearia: req.params.Codbarbearia})
            existsOrError(rowsUpdated, 'Barberaria não foi encontrada.')
        
            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return {save, get, getById, remove}
}