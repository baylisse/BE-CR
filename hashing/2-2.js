const bcrypt = require('bcrypt');

const comparePassword = async (password, hashed) => {
    return bcrypt.compare(password, hashed);
}

module.exports = {
    comparePassword
}