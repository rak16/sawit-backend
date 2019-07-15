'use strict';

const asyncHandler = require('express-async-handler');

const {
    registerUser,
    authenticateUser
} = require('../controllers/auth.controller');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.post(`${urlPrefix}/signup`, asyncHandler(registerUser));
    app.post(`${urlPrefix}/auth/login`, asyncHandler(authenticateUser));
    app.post(`${urlPrefix}/auth/logout`, asyncHandler(() => {}));
};