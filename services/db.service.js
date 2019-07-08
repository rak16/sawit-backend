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

	const query = `
		SELECT *
		FROM users
		ORDER BY id ASC
	`;

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

	const query = `
		SELECT *
		FROM users
		WHERE email = $1
		ORDER BY id ASC
	`;
	const params = [email];

	pool.query(query, params, (error, results) => {
		if (error) {
			console.log(`Error occured while fetching user details with email: ${email}`);
			console.log(error);

			defer.reject(error);
		} else {
			console.log(`Fetched user details with email: ${email}`);

			defer.resolve(results.rows[0]);
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

	const query = `
		INSERT INTO users
			(id, name, email, password, created_at)
		VALUES 
			($1, $2, $3, $4, $5)
	`;
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

const getAllPosts = (limit = 200, offset = 0) => {
	const defer = q.defer();

	const query = `
		SELECT *
		FROM posts
		ORDER BY created_at DESC
		LIMIT $1
		OFFSET $2
	`;
	const params = [limit, offset];

	pool.query(query, params, (error, results) => {
		if (error) {
			console.log('Error occured while fetching posts');
			console.log(error);

			defer.reject(error);
		} else {
			console.log(`Fetched posts with limit = ${limit} and offset = ${offset}`);

			defer.resolve(results.rows);
		}
	});

	return defer.promise;
}

const getPostsByUserId = (userId, limit = 50, offset = 0) => {
	const defer = q.defer();

	if (userId) {
		const query = `
			SELECT posts.url, posts.caption, posts.created_at
			FROM posts INNER JOIN (
				SELECT user_id, post_id
				FROM likes
				WHERE likes.user_id = $1
			) AS user_liked_posts
			ON posts.id = user_liked_posts.post_id
			ORDER BY created_at DESC
			LIMIT $2
			OFFSET $3
		`;
		const params = [userId, limit, offset];

		pool.query(query, params, (error, results) => {
			if (error) {
				console.log(`Error occured while fetching posts with userId = ${userId}`);
				console.log(error);

				defer.reject(error);
			} else {
				console.log(`Fetched posts with userId = ${userId} limit = ${limit} and offset = ${offset}`);

				defer.resolve(results.rows);
			}
		});
	} else {
		console.log('No userId provided');

		defer.reject(new Error('userId missing'));
	}

	return defer.promise;
}

module.exports = {
	getUsers,
	createUser,
	getUserByEmail,

	getAllPosts,
	getPostsByUserId
};