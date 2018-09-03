const express = require('express')
const moment_timezone = require('moment-timezone')
const msql = require('../database/connection')
const router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
	msql.query('SELECT * from users;', function(error, results, fields) {
		if (error) throw error
		// filter self
		var usersData = results.filter(user => !user.isAdmin)
		// unix time convert
		usersData = usersData.map(user => {
			user.create_time = user.create_time
				? moment_timezone
						.unix(user.create_time)
						.tz('Asia/Taipei')
						.format('YYYY-MM-DD HH:mm:ss')
				: null
			user.update_time = user.update_time
				? moment_timezone
						.unix(user.update_time)
						.tz('Asia/Taipei')
						.format('YYYY-MM-DD HH:mm:ss')
				: null
			return user
		})
		res.render('partial/usersTable', { users: usersData })
	})
})

/* POST A user */
router.post('/', function(req, res, next) {
	const { username, password, email } = req.body
	if (!username || !password || !email) {
		res.status(400).send('Username, Password, Email is all require fields!')
		return
	}

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
	const { password, email } = req.body
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
