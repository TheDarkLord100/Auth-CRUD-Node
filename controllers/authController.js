const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('Hello World!');
};

const registerNewUser = async (req, res) => {
    try {
        const { name, username, email, phone, password } = req.body;
        if (!name || !username || !email || !phone || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const exist = await User.findOne({ email, phone, username });
        if (exist) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ name, username, email, phone, password: hashedPassword });

        res.status(201).json({ msg: 'User created successfully', data: newUser });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User Not Found' });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid credentials' });
        } else {
            const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, {},
                (err, token) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    res.json({ msg: 'Logged in successfully', data: user, token: token });
                });
        }
    } catch (error) {
        console.log(error);
    }
};

const getSeller = async (req, res) => {
    try {
        const {sellerId} = req.body;
        const user = await User.findOne({ _id: sellerId });
        if (!user) {
            return res.status(400).json({ error: 'User Not Found' });
        }
        res.json({ msg: 'User found', data: user });    
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    test,
    registerNewUser,
    loginUser,
    getSeller
};