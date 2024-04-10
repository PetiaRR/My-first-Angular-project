const { User, Course, Post } = require('../models');

function newPost(text, userId, courseId) {
    return Post.create({ text, userId, courseId })
        .then(post => {
            return Promise.all([
                User.updateOne({ _id: userId }, { $push: { posts: post._id }, $addToSet: { courses: courseId } }),
                Course.findByIdAndUpdate({ _id: courseId }, { $push: { posts: post._id } }, { new: true })
            ])
        })
}

function getLatestsPosts(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    Post.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('courseId userId')
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(next);
}

function createPost(req, res, next) {
    const { courseId } = req.params;
    const { _id: userId } = req.user;
    const { postText } = req.body;

    newPost(postText, userId, courseId)
        .then(([_, updatedCourse]) => res.status(200).json(updatedCourse))
        .catch(next);
}

function editPost(req, res, next) {
    const { postId } = req.params;
    const { postText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    Post.findOneAndUpdate({ _id: postId, userId }, { text: postText }, { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function deletePost(req, res, next) {
    const { postId, courseId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        Post.findOneAndDelete({ _id: postId, userId }),
        User.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
        Course.findOneAndUpdate({ _id: courseId }, { $pull: { posts: postId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}

function like(req, res, next) {
    const { postId } = req.params;
    const { _id: userId } = req.user;

    console.log('like')

    postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

module.exports = {
    getLatestsPosts,
    newPost,
    createPost,
    editPost,
    deletePost,
    like,
}