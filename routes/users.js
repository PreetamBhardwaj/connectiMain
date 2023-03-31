const express = require('express');
const router = express.Router();
const userscontroller = require('../controllers/users_controller');

router.get('/profile',userscontroller.profile);

router.get('/sign-up',userscontroller.sign_up);

router.get('/sign-in',userscontroller.sign_in);

router.post('/create-user',userscontroller.createuser);

module.exports = router;