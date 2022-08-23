const User = require('./User.js');
const bcrypt = require('bcrypt');

const user = {
    username: 'albert',
    password: 'bertie99'
};

const register = async (username, password) => {
    try {
        const hashedPw = await bcrypt.hash(password, 1);
        let createdUser = await User.create({ 
                username, 
                password: hashedPw
            });
        return 'registered user';
    } catch(error) {
        console.error(error);
    };
};

const login = async (username, password) => {
    try {
        const [foundUser] = await User.findAll({
            where: {username}
        });

        if(!foundUser) {
            return 'user not found';
        };

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if(isMatch) {
            return 'user found';
        } else {
            return 'user not found';
        };

    } catch(error) {
        console.error(error);
    };
    
};


module.exports = {
    register,
    login
};