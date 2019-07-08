'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../services/db.service');

const config = require('../config/config');

const registerUser = async (req, res, next) => {
    const {
        name,
        email,
        password
    } = req.body;

    const hashedPassword = bcrypt.hashSync(password); // TODO: Change to async hash

    try {
        const params = {
            name,
            email,
            password: hashedPassword
        };
        await db.createUser(params);

        const user = await db.getUserByEmail(email);

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign(
            { id: user.id },
            config.JWT_SECRET_KEY,
            { expiresIn }
        );

        res.status(200).json({
            'user': user,
            'access_token': accessToken,
            'expires_in': expiresIn
        });
    } catch (err) {
        next(err);
    }
}

const authenticateUser = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await db.getUserByEmail(email);
        if (!user) {
            return res.status(404).send('No user with the given email id');
        }

        const result = bcrypt.compareSync(password, user.password); // TODO: Make this async
        if (!result) {
            return res.status(401).send('Incorrect password.');
        }

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign(
            { id: user.id },
            config.JWT_SECRET_KEY,
            { expiresIn }
        );

        res.status(200).json({
            'user': {
                name: user.name,
                email: user.email,
                created_at: user.created_at                
            },
            'access_token': accessToken,
            'expires_in': expiresIn
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerUser,
    authenticateUser
};