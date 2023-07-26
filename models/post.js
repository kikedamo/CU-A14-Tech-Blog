const sequelize = require('../config/connection')
const {Model, DataTypes} = require('sequelize')

class Post extends Model {
    checkPassword(loginPw){
        return bcrypt.compareSync(loginPw, this.password);
    }
}

Post.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
        },
        title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        body:{
            type:DataTypes.STRING,
        },
        date_created:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW,
        },
        user_id:{
            type:DataTypes.INTEGER,
            references:{
                model: "User",
                key:"id",
            }
        },
    },
    {
        sequelize, 
        timestamp: false, 
        freezeTableName:true, 
        underscored: true, 
        modelName: "Post",
    }
);

module.exports = Post;