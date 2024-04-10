const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {ObjectId} = mongoose.Schema.Types;


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username should be at least 5 characters'],
        
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password should be at least 5 characters'],
        
    },
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'Post'
    }]
}, { timestamps: { createdAt: 'created_at' } });

userSchema.methods = {
    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }
}

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model('User', userSchema);

module.exports = User;