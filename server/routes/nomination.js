const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.post('/', auth(), controllers.nomination.post);

module.exports = router;