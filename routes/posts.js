const express = require('express');
const router = express.Router();
const passport = require('passport');
const posts_controller = require('../controllers/posts_controller');

router.post('/create-post', passport.checkAuthentication ,posts_controller.create);

router.get('/destroy-post/:id', passport.checkAuthentication , posts_controller.destroy);

module.exports = router;