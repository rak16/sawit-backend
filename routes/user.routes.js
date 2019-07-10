'use strict';

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
    app.get(`${urlPrefix}/user`, verifyAuthentication, getUserDetails);
    app.get(`${urlPrefix}/user/feed`, verifyAuthentication, getUserFeed);
    app.post(`${urlPrefix}/user/password/reset`, verifyAuthentication, resetUserPassword);
};