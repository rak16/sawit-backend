'use strict';

const asyncHandler = require('express-async-handler');

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
    app.get(`${urlPrefix}/feed/user/:user_id`, verifyAuthentication, asyncHandler(() => {}));
    app.get(`${urlPrefix}/feed/post/:post_id/likes`, verifyAuthentication, asyncHandler(() => {}));
    app.post(`${urlPrefix}/feed/post/:post_id/like`, verifyAuthentication, asyncHandler(likePost));
    app.post(`${urlPrefix}/feed/post/:post_id/unlike`, verifyAuthentication, asyncHandler(unlikePost));
};