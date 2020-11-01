var auth = (req, res, next) => {
    console.log('Oldu');
    next();
};

module.exports = auth;
