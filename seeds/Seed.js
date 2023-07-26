const sequelize = require('../config/connection');
const {User,Post} = require('../models');
const UserData = require('./UserData.json');
const PostData = require('./PostData.json');

const SeedDB = async() =>{
    await sequelize.sync({force:true});
    const User = await User.bulkCreate(UserData, {
        individualHooks:true,
        returning: true,
    });
    for (const Post of PostData){
        await Post.create({
            ...post,
            user_id:User[Math.floor(Math.random() * User.length)].id
        })
    }
    process.exit(0);
}

SeedDB();
