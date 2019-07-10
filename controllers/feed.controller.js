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

const likePost = async (req, res, next) => {
    const postId = req.params.post_id;
    const userId = req.decoded.id;

    try {
        await db.incrementLikeCount(userId, postId);
        return res.status(200).send(`Updated like count on ${postId}`);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getGlobalFeed,
    likePost
};