'use strict';

const {
    registerUser,
    authenticateUser
} = require('../controllers/auth.controller');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.post(`${urlPrefix}/signup`, registerUser);
    app.post(`${urlPrefix}/auth/login`, authenticateUser);
    app.post(`${urlPrefix}/auth/logout`, (req, res, next) => {});
};