require('dotenv').config();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {

    const userLogin = req.body;

    try{
        const newUser = await User.findOne({email: userLogin.email});

        if (!newUser) {
            return res.json({success: false, message: 'Invalid email or password'});
        }

        const passCorrect = await bcrypt.compare(userLogin.password, newUser.password);

        if (passCorrect) {
            const payload = {
                id: newUser._id,
                email: newUser.email
            };

            const token = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: 10}
            );

            return res.json({
                success: true,
                accessToken: token
            });
        } else {
            return res.json({success: false, message: 'Invalid email or password'});
        }
    } catch (err) {
        return res.json({success: false, message: 'Something went wrong'});
    }

};

module.exports = login;