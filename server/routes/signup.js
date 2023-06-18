require('dotenv').config();
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const oops = {success: false, message: 'Something went wrong'};

const signup = async (req, res) => {
    const user = req.body;

    let newUser;
    let doc;
    try {
        let takenEmail = await User.findOne({email: user.email});

        if (takenEmail) {
            return res.json({success: false, message: 'Email has already been taken'});
        }

        user.password = await bcrypt.hash(req.body.password, 10);

        newUser = new User({
            email: user.email.toLowerCase(),
            password: user.password
        });

        doc = await newUser.save();
    } catch (err) {
        console.log('signup ln 27');
        return res.json(oops);
    }
    
    try {
        if (doc == newUser) {
            const payload = {
                id: newUser._id,
                email: newUser.email
            };

            const token = jwt.sign(
                payload,
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: 1200}
            );

            return res.json({
                success: true,
                accessToken: token
            })

        } else {
            throw new Error('save failed');
        }
    } catch (error) {
        console.log('signup ln 55');
        await User.deleteOne({email: newUser.email});
        return res.json(oops);
    }
    
};

module.exports = signup;