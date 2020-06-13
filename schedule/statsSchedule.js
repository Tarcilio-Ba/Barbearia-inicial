const schedule = require('node-schedule')

module.exports = app => {
    schedule.scheduleJob('*/1 * * * *', async function(){
        const barbeariasCount = await app.db('barbearias').count('Codbarbearia').first()
        const barbeirosCount = await app.db('barbeiros').count('Codbarbeiro').first()
        const agendamentosCount = await app.db('agendamentos').count('Codagendamento').first()
        const clientesCount = await app.db('clientes').count('Codcliente').first()
    
        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {}, 
            {sort: {'createdAt': -1}})
        
        const stat = new stat({
            barbearias: barbeariasCount.count,
            barbeiros: barbeirosCount.count,
            agendamentos: agendamentosCount.count,
            clientes: clientesCount.count

        })
        const changeBarbearias = lastStat||stat.barbearias !== lastStat.barbearias
        const changeBarbeiros = lastStat ||stat.barbeiros !== lastStat.barbeiros
        const changeAgendamentos = lastStat || stat.agendamentos !== lastStat.agendamentos
        const changeClientes = lastStat || stat.clientes !== lastStat.clientes
    
        if(changeBarbearias||changeBarbeiros||changeClientes||changeAgendamentos){
            stat.save().then(()=> console.log('[stats] Estatísticas atualizadas.'))
        }
    })
}