'use strict';

const db = require('../services/db.service');

const getUserDetails = async (req, res, next) => {
    const userId = req.decoded.id;

    try {
        const userDetails = await db.getUserById(userId);
        const {
            name,
            email
        } = userDetails;

        return res.status(200).json({
            name,
            email
        });
    } catch (err) {
        next(err);
    }
}

const getUserFeed = async (req, res, next) => {
    const userId = req.decoded.id;
    const limit = req.body.limit || req.query.limit;
    const offset = req.body.offset || req.query.offset;

    try {
        const posts = await db.getPostsByUserId(userId, limit, offset);
        return res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUserFeed,
    getUserDetails
};