const {JWT_SECRET} = process.env;
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, JWT_SECRET)
}

module.exports = generateToken;