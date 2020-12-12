module.exports = (req, res, next) => {
    if (req.session.user != undefined && req.session.user.email == "admin@email.com") {
        return next();
    }
    return res.redirect('/');
}