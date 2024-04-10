const jwt = require('jsonwebtoken');


exports.auth = async (req, res, next) => {
    const token = req.window.sessionStorage['token'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = await jwt.verify(token, 'jfjsfhksfsdjfsdfk');

        req.user = decodedToken;
        res.locals.isAuthenticated = true;
        res.locals.user = decodedToken;

        next();
    } catch {
        res.clearSessionStorage('token');

        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}