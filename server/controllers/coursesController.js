const router = require('express').Router();
const coursesServices = require('../services/coursesService')
const isAuth = require('./../middlewares/authMiddleware')

router.post('/',  async (req, res) => {
    //const courseData = req.body;
    const {courseName, post} = req.body;
    const userId = req.params.id;
    console.log(req.params.id)
    const courseData = { courseName, post, userId}
    console.log(courseData)

    const course = await coursesServices.create(courseData);
    console.log(course)
    res.json(course);
})

router.get('/', async (req,res) => {
    const courses = await coursesServices.getAll();
    res.json(courses);
})

router.get('/:id', async (req,res) => {
    const courseId = req.params.id
    
    const course = await coursesServices.findById(courseId)
    
    res.json(course);
})
module.exports = router;