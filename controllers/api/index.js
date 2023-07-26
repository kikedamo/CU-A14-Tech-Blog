const router = require('express').Router();
const UserRoutes = require('./userroutes');
const PostRoutes = require('./postroutes');
router.use('/posts', PostRoutes);
router.use('/users', UserRoutes);


module.exports=router;