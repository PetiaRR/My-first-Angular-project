const router = require('express').Router();

const userService = require('../services/userService');

router.get('/profile', async (req, res) => {
    const userData = req.user;
    const { userId, username, email} = await userService.getProfileInfo(userData);

    res.json({
        userId,
        username,
        email,
        
    });
})
router.put('/profile', async (req, res) => {
    const userData = req.body;
    const { userId, username, email} = await userService.updateProfileInfo(userData);
    res.json({
        userId,
        username,
        email
    })
})

module.exports = router;
