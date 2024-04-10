const router = require('express').Router();
const coursesServices = require('../services/coursesService')
const isAuth = require('./../middlewares/authMiddleware')

router.post('/',  async (req, res) => {
    //const courseData = req.body;
    const {courseName, post} = req.body;
    const userId = req.userId
    const courseData = { courseName, post, userId}
    

    const course = await coursesServices.create(courseData);
    console.log(course)
    res.json(course);
})

router.get('/', async (req,res) => {
    const courses = await coursesServices.getAll();
    res.json(courses);
})

router.get('/:id', async (req,res) => {
    const {courseId} = req.params
    console.log(courseId)
    const course = await coursesServices.findById(courseId).populate({
        path : 'posts',
        populate : {
          path : 'userId'
        }});
        console.log(course)
    res.json(course);
})
module.exports = router;