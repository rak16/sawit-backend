'use strict';

const db = require('../services/db.service');

const getGlobalFeed = async (req, res, next) => {
    const limit = req.body.limit || req.query.limit;
    const offset = req.body.offset || req.query.offset;

    const posts = await db.getAllPosts(limit, offset);
    return res.status(200).json(posts);
}

const likePost = async (req, res, next) => {
    const postId = req.params.post_id;
    const userId = req.decoded.id;

    await db.incrementLikeCount(userId, postId);
    return res.status(200).send(`Liked post: ${postId}`);
}

const unlikePost = async (req, res, next) => {
    const postId = req.params.post_id;
    const userId = req.decoded.id;

    const unliked = await db.decrementLikeCount(userId, postId);

    if (unliked) {
        return res.status(200).send(`Unliked post: ${postId}`);
    }

    return res.status(200).send(`Post ${postId} is not liked`);
}

module.exports = {
    getGlobalFeed,
    likePost,
    unlikePost
};