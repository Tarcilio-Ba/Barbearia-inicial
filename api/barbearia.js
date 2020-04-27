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
            existsOrError(barbearia.password, barbearia.confirmPassword, 'Senha não conferem')
        
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
            .then(barbearias => res.json(barbearias))
            .catch(err => res.status(500).send(err))

    }

    const getById = (req,res) => {
        app.db('barbearias')
            .select('Codbarbearia','nome','endereco','email','telefone','admin')
            .where({Codbarbearia: req.params.Codbarbearia})
            .first()
            .then(barbearia => res.json(barbearia))
            .catch(err => res.status(500).send(err))

    }

    return {save, get, getById}
}