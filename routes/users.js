const express = require('express')
const msql = require('../database/connection')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
	msql.query('SELECT * from users;', function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
	})
})

/* POST A user */
router.post('/', function(req, res, next) {
	const { username, password, email } = req.body
	const query = `INSERT INTO users(username, password, email, create_time) values('${username}', '${password}', '${email}', UNIX_TIMESTAMP(now()));`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
	})
})

/* Delete A user */
router.delete('/:id', function(req, res, next) {
	const query = `DELETE FROM users WHERE id = ${req.params.id};`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
	})
})

/* Edit A user */
router.put('/:id', function(req, res, next) {
	const { username, password, email } = req.body
	const query = `update users set
		${null ? `username='${username}',` : ''}
		${password ? `password='${password}',` : ''}
		${email ? `email='${email}',` : ''}
		update_time=UNIX_TIMESTAMP(now()) where id=${req.params.id};`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
	})
})

module.exports = router
