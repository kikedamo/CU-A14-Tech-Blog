const Post= require('./post');
const User= require('./user');

Post.belongsTo(User, {
    foreignKey:"user_id"
});

User.hasMany(Post, {
    foreignKey:"user_id",
    onDelete:'CASCADE'
});

module.exports={Post, User};

