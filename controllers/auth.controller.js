'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../services/db.service');

const config = require('../config/config');

const registerUser = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = bcrypt.hashSync(req.body.password); // TODO: Change to async hash

    try {
        const params = {
            name,
            email,
            password
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
            "user": user,
            "access_token": accessToken,
            "expires_in": expiresIn
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerUser
};