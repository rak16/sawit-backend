'use strict';

const q = require('q');
const uuid = require('uuid/v4');
const Pool = require('pg').Pool;

const config = require('../config/config');

// TODO: Move to configuration
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'sawit',
	password: 'root',
	port: 5432
});

const getUsers = () => {
	const defer = q.defer();

	const query = 'SELECT * FROM users ORDER BY id ASC';

	pool.query(query, (error, results) => {
		if (error) {
			defer.reject(error);
		} else {
			defer.resolve(results.rows);
		}
	});

	return defer.promise;
}

const getUserByEmail = email => {
	const defer = q.defer();

	const query = 'SELECT * FROM users WHERE email = $1 ORDER BY id ASC';
	const params = [email];

	pool.query(query, params, (error, results) => {
		if (error) {
			defer.reject(error);
		} else {
			defer.resolve(results.rows);
		}
	});

	return defer.promise;
}

const createUser = user => {
	const defer = q.defer();

	const {
		name,
		email,
		password
	} = user;

	const userId = uuid();
	const createdAt = new Date();

	const query = 'INSERT INTO users (id, name, email, password, created_at) VALUES ($1, $2, $3, $4, $5)';
	const params = [userId, name, email, password, createdAt];

	console.log('Creating user with params ');
	console.log(params);

	pool.query(query, params, (error, results) => {
		if (error) {
			console.log('Error occured while creating user');
			console.log(error);

			defer.reject(error);
		} else {
			console.log(`Created user with id ${userId}`);

			defer.resolve(results.insertId);
		}
	});

	return defer.promise;
}

module.exports = {
	getUsers,
	createUser,
	getUserByEmail
};