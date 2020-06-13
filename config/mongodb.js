const mongoose = require('mongoose')
mongoose.connect('mongodb: localhost/data',{useNewUrlParser: true})
    .catch (e => {
        const msg = 'ERRO! Não foi possível conectar com Mongodb'
        console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    })