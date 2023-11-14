const { DataTypes } = require('sequelize');
const sequelize = require('../configs/database')
const Register = sequelize.define(
    'Register',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull:false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        }
    }, {
    sequelize,
    timestamps:true
})
module.exports = Register;