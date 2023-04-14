const express = require('express');
const router = express.Router();
const commentscontroller = require('../controllers/comments_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,commentscontroller.create);

router.get('/destroy-comment/:id', passport.checkAuthentication ,commentscontroller.destroy);

module.exports = router;