'use strict';

const {
    getGlobalFeed,
    likePost,
    unlikePost
} = require('../controllers/feed.controller');

const {
    verifyAuthentication
} = require('../middlewares/auth.middleware');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.get(`${urlPrefix}/feed`, getGlobalFeed);
    app.get(`${urlPrefix}/feed/user/:user_id`, verifyAuthentication, () => {});
    app.get(`${urlPrefix}/feed/post/:post_id/likes`, verifyAuthentication, () => {});
    app.post(`${urlPrefix}/feed/post/:post_id/like`, verifyAuthentication, likePost);
    app.post(`${urlPrefix}/feed/post/:post_id/unlike`, verifyAuthentication, unlikePost);
};