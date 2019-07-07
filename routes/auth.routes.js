'use strict';

const { registerUser } = require('../controllers/auth.controller');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.post(`${urlPrefix}/signup`, registerUser);
    app.post(`${urlPrefix}/auth/login`, (req, res, next) => {});
    app.post(`${urlPrefix}/auth/logout`, (req, res, next) => {});
};