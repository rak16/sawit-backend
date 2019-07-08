'use strict';

const jwt = require('jsonwebtoken');

const config = require('../config/config');

const verifyAuthentication = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token) {
        jwt.verify(
            token,
            config.JWT_SECRET_KEY,
            (err, decoded) => {
                if (err) {
                    return res.status(401).send('Failed to authenticate user.');
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
    } else {
        return res.status(403).send('No token provided.');
    }
}

module.exports = {
    verifyAuthentication
};