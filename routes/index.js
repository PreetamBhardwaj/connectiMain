const express = require('express');
const router = express.Router();
const homecontroller = require('../controllers/home_controller');
const posts_controller = require('../controllers/posts_controller');

console.log("router loaded");

router.get('/',homecontroller.home);

router.use('/users',require('./users'));

// router.post('/posts/create-post',posts_controller.create);

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

module.exports = router;