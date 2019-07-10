'use strict';

const {
    getGlobalFeed,
    likePost
} = require('../controllers/feed.controller');

const {
    verifyAuthentication
} = require('../middlewares/auth.middleware');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.get(`${urlPrefix}/feed`, getGlobalFeed);
    app.get(`${urlPrefix}/feed/user/:user_id`, verifyAuthentication, () => {});
    app.get(`${urlPrefix}/feed/post/:post_id/likes`, verifyAuthentication, () => {});
    app.put(`${urlPrefix}/feed/post/:post_id/like`, verifyAuthentication, likePost);
    app.put(`${urlPrefix}/feed/post/:post_id/unlike`, verifyAuthentication, () => {});
};