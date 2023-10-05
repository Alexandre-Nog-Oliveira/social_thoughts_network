const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('ThoughtsNetwork', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'

})

try{
    sequelize.authenticate()
    console.log('Conectado ao banco com sucesso!')
}catch(err){
    console.log(`Não foi possível conectar devidoi ao erro: ${err}`)
}

module.exports = sequelize