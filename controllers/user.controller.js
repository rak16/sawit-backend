'use strict';

const db = require('../services/db.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config/config');

const getUserDetails = async (req, res, next) => {
    const userId = req.decoded.id;

    const userDetails = await db.getUserById(userId);
    const {
        name,
        email
    } = userDetails;

    return res.status(200).json({
        name,
        email
    });
}

const getUserFeed = async (req, res, next) => {
    const userId = req.decoded.id;
    const limit = req.body.limit || req.query.limit;
    const offset = req.body.offset || req.query.offset;

    const posts = await db.getPostsByUserId(userId, limit, offset);
    return res.status(200).json(posts);
}

const resetUserPassword = async (req, res, next) => {
    const {
        oldPassword,
        newPassword
    } = req.body;

    const userId = req.decoded.id;

    if (!(oldPassword && newPassword)) {
        return res.status(422).send('Mandtory fields: oldPassword, newPassword');
    }

    const user = await db.getUserById(userId);
    if (!user) {
        next(new Error(`No user found with id ${userId}`));
    }

    const result = await bcrypt.compare(oldPassword, user.password);
    if (!result) {
        return res.status(401).send('Incorrect password.');
    }

    const hashedPassword = await bcrypt.hash(newPassword);
    await db.updatePasswordByUserId(user.id, hashedPassword);

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
}

module.exports = {
    getUserFeed,
    getUserDetails,
    resetUserPassword
};