'use strict';

const {
    verifyAuthentication
} = require('../middlewares/auth.middleware');

const urlPrefix = '/api/v1';

module.exports = app => {
    app.get(`${urlPrefix}/feed`, () => {});
    app.get(`${urlPrefix}/feed/:user_id`, verifyAuthentication, () => {});
    app.get(`${urlPrefix}/feed/post/:post_id/likes`, verifyAuthentication, () => {});
    app.put(`${urlPrefix}/feed/post/:post_id/like`, verifyAuthentication, () => {});
    app.put(`${urlPrefix}/feed/post/:post_id/unlike`, verifyAuthentication, () => {});
};