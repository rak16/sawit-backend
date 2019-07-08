'use strict';

const {
    verifyAuthentication
} = require('../middlewares/auth.middleware');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.get(`${urlPrefix}/user/:id`, verifyAuthentication, () => {});
    app.post(`${urlPrefix}/user/password/forgot`, verifyAuthentication, () => {});
    app.get(`${urlPrefix}/user/password/reset/:token`, () => {});
    app.post(`${urlPrefix}/user/password/reset/:token`, () => {});
};