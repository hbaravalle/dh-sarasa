function rememberMiddleware (req, res, next) {
    next();

    if (req.cookies.remember != undefined && req.session.user == undefined) {
        req.session.user = req.cookies.remember;
    }
}

module.exports = rememberMiddleware;