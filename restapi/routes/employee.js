const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.employee.get);

router.post('/', auth(), controllers.employee.post);

router.put('/:id', auth(), controllers.employee.put);

router.delete('/:id', auth(), controllers.employee.delete);

module.exports = router;