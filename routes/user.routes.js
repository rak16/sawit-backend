'use strict';

const asyncHandler = require('express-async-handler');

const {
    getUserFeed,
    getUserDetails,
    resetUserPassword
} = require('../controllers/user.controller');

const {
    verifyAuthentication
} = require('../middlewares/auth.middleware');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.get(`${urlPrefix}/user`, verifyAuthentication, asyncHandler(getUserDetails));
    app.get(`${urlPrefix}/user/feed`, verifyAuthentication, asyncHandler(getUserFeed));
    app.post(`${urlPrefix}/user/password/reset`, verifyAuthentication, asyncHandler(resetUserPassword));
};