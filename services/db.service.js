'use strict';

const q = require('q');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'user',
    host: 'host',
    database: 'db',
    password: 'password',
    port: 5432,
});

const config = require('../config/config.js');

const getUsers = () => {
	const defer = q.defer();

	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
	    if (error) {
			defer.reject(error);
	    } else {
			defer.resolve(results.rows);
		}
	});

	return defer.promise;
}

module.exports = {
    getUsers
}
