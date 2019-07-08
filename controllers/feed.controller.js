'use strict';

const db = require('../services/db.service');

const getGlobalFeed = async (req, res, next) => {
    const limit = req.body.limit || req.query.limit;
    const offset = req.body.offset || req.query.offset;

    try {
        const posts = await db.getAllPosts(limit, offset);
        return res.status(200).json(posts);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getGlobalFeed
};