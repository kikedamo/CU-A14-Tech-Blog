const router = require('express').Router();
const ApiRoutes = require('./api/index');
const HomeRoutes = require('./homeroutes');

router.use('/', HomeRoutes);
router.use('/api', ApiRoutes);

module.exports=router;