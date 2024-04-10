const Course = require('../models/Course');

exports.create = (courseData) => Course.create(courseData);

exports.getAll = () => Course.find()

exports.findById = (courseId) => Course.findById(courseId)
// .populate({
//     path : 'posts',
//     populate : {
//       path : 'userId'
//     }
//   })



