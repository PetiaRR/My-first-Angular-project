const router = require('express').Router();
const userController = require('./controllers/userController');
const profileController = require('./controllers/profileController')
const courseController = require('./controllers/coursesController.js')

router.use ('/auth', userController);
router.use ('/users', profileController);
router.use ('/courses', courseController);
router.use ('/courses/:id', courseController)
module.exports = router;