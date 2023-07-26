const router = require('express').Router();
const {User} = require('../../models');

router.post("/", async(req,res) => {
    console.log(req.body);
    try{
        const UserData = await User.create(req.body);
        console.log(UserData);
        req.session.save(() => {
            req.session.user_id = UserData.id;
            req.session.loggedIn = true;
            res.status(200).json(UserData);
        });
    }catch(err){
        res.status(400).json(err);
    }
});

router.post("/login", async(req,res)=> {
    console.log(req.body);
    try{
        const UserData = await User.findOne({
            where:{email: req.body.email}
        });
        if(!UserData){
            res.status(400).json({message: "Invalid Username/Email. Try Again"});
            return;
        }
        req.session.save(() =>{
            req.session.user_id = UserData.id;
            req.session.loggedIn = true;
            res.json({
                user: UserData,
                message: "Login Successful. Welcome!!",
            });
        });
    }catch(err){
        res.status(400).json(err);
    }
});

router.post("/logout", (req,res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        })
    }else{
        res.status.apply(404).end();
    }
});

module.exports = router;

