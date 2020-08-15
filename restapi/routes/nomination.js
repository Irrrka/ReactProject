const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.nomination.get);

router.post('/', auth(), controllers.nomination.post);

router.put('/:id', auth(), controllers.nomination.put);

//outer.delete('/:id', auth(), controllers.nomination.delete);

module.exports = router;