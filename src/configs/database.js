const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('register','postgres','chouavang',{
    host: 'localhost',
    dialect:'postgres',
    port:'5432',
    logging:false
})

sequelize.authenticate().then(() =>{
console.log("Connected database successfully");
}).catch((error) =>{
    console.log(error)
})

sequelize.sync();
module.exports = sequelize;