const router = require('express').Router();
const {Post, User} = require("../models");
const withAuth = require("../utils/auth");

router.get('/', async(req,res) => {
    try {
        const PostData = await Post.findAll({
            include:[
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        })
        const Posts = PostData.map((Post) => Post.get({plain:true}));
        res.render('homepage', {
            Posts,
            loggedIn:req.session.loggedIn
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/posts/:id', async (req, res) =>{
    try{
        const PostData = await Post.FindByPK(req.params.id, {
            include:[
                {
                    Model: User,
                    attributes: ['username']
                }
            ]
        })
        const Post = PostData.get({plain:true});
        res.render('Post',{
            ...Post,
            loggedIn: req.session.loggedIn
        });
    } catch(err){
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) =>{
    try{
        const UserData = await User.FindByPK(req.session.user_id,{
            attributes:{exclude:['password']},
            include:[{model: Post}],
        })
        const User = UserData.get({plain:true});
        res.render('dashboard', {
            ...User, 
            loggedIn: true
        })
    } catch(err){
        res.status(500).json(err);
    }
})

router.get('/login', (req, res) => {
    if(req.session.loggedIn){
        res.redirect('/dashboard')
        return;
    }
    res.render('login');
});

module.exports = router;
