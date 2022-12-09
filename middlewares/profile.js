const profile = (req, res, next) => {
    console.log(req.profile);
    next();
}

module.exports = profile;