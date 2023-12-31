const router = require('express').Router();
const {Post} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", withAuth, async(req,res) => {
    try {
        console.log("Post")
        const NewPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(NewPost);
    } catch(err){
        res.status(400).json(err);
    }
});

router.delete("/:id", withAuth, async(req,res) => {
    try{
        const PostData = await Post.destroy({
            where:{
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        if(!PostData){
            res.status(404).json({message: "No Post Found With That id"});
            return;
        }
        res.status(200).json(NewPost);
    } catch(err){
        res.status(400).json(err);
    }
});

module.exports = router
