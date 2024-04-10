const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;



const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }],
}, { timestamps: { createdAt: 'created_at' } });

    
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;