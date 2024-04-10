const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.register = async (userData) => {
    if (userData.password !== userData.rePassword) {
        throw new Error('Password missmatch!');
    }
    const user = await User.create(userData);

    const token = jwt.sign({
        _id: user._id,
        email: user.email,
    }, 'jfjsfhksfsdjfsdfk')

    return {
        userId: user._id,
        email: user.email,
        token: token,
    }
};

exports.login = async (userData) => {
    const user = await User.findOne({email: userData.email});
     if (!user) {
        throw new Error('No such user');
     }
     const isValid = await bcrypt.compare(userData.password, user.password);
     if (!isValid) {
        throw new Error('No such user');
     }

     const token = jwt.sign({
        _id: user._id,
        username: user.username,
        email: user.email,
    }, 'jfjsfhksfsdjfsdfk')

    return {
        userId: user._id,
        username: user.username,
        email: user.email,
        token: token,
    }
}
exports.getProfileInfo = async (userData) => {
    const user = await User.findOne({userId: userData.userId});
    return {
        userId: user._id,
        email: user.email,
}
}

exports.updateProfileInfo = async (userData) => {
    //const { _id: userId} = req.user;
    const { username, email} = userData;
    console.log(userData.userId)
    const user = await User.findOneAndUpdate({userId: userData.userId}, {username, email});   
    //const user = await User.create(userData);
    console.log(user.userId)
    return {
        userId: user._id,
        username: user.username,
        email: user.email,
    }
}