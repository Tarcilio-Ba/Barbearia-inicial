module.exports = app => {
    const Stat = app.mongoose.model('Stat',{
        barbeiros: Number,
        clientes: Number,
        vendas: Number,
        agendamentos: Number,
        createdAt: Date
    }) 

    const get = (req, res) => {
        Stat.findOne({},{}, {sort: {'createdAt': -1}})
            .then(stat =>{
                const defaultStat = {
                    barbeiros: 0,
                    clientes: 0,
                    clientes: 0,
                    vendas: 0,
                    agendamentos: 0
                }
             res.json(stat || defaultStat)
            })
    }

    return {Stat, get}
}