const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/users_controller');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication,userscontroller.profile);

router.post('/update/:id',passport.checkAuthentication,userscontroller.update);

router.get('/sign-up',userscontroller.sign_up);

router.get('/sign-in',userscontroller.sign_in);

router.post('/create-user',userscontroller.createuser);

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userscontroller.createsession);

router.get('/sign-out',userscontroller.signout);

module.exports = router;