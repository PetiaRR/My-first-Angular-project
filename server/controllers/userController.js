const router = require('express').Router();

const userService = require('../services/userService');

router.post('/register', async (req, res) => {
    
    const userData = req.body;
    const { userId, email, token} = await userService.register(userData);

    res.json({
        userId,
        email,
        token,
    });
});

router.post('/login', async (req, res) => {
    
    const userData = req.body;
    
    
    const { userId, username, email, token} = await userService.login(userData);

    res.json({
        userId,
        username,
        email,
        token,
    });
});

router.post('/logout', async (req, res) => {
    res.json({ok:true});
})



module.exports = router;