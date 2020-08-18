const controllers = require('../controllers');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/', controllers.employee.get);

router.get('/details/', controllers.employee.getDetails);

router.post('/', auth(), controllers.employee.post);

router.put('/:id', auth(), controllers.employee.put);

router.put('/like/:id', auth(), controllers.employee.like);

router.put('/nominate/:id', auth(), controllers.employee.nominate);

router.delete('/:id', auth(), controllers.employee.delete);


module.exports = router;