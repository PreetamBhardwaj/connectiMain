const express = require('express');
const router = express.Router();
const posts_controller = require('../controllers/posts_controller');

router.post('/create-post', posts_controller.create);

module.exports = router;