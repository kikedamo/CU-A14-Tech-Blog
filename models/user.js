const sequelize = require('../config/connection')
const {Model, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{isEmail:true,
            },
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{len:[6],},
        },
    },
    {
        hooks:{
            beforeCreate: async(NewUser) => {
                NewUser.password = await bcrypt.hash(NewUser.password, 10);
                return NewUser;
            },
            beforeUpdate: async(UpdatedUser) => {
                UpdatedUser.password = await bcrypt.hash(UpdatedUser.password, 10);
                return UpdatedUser;
            },
        },
        sequelize, 
        timestamp: false, 
        freezeTableName:true, 
        underscored: true, 
        modelName: "User",
    }
);

module.exports = User;