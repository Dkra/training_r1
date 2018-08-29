var express = require('express')
const msql = require('../database/connection')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Login Page' })
})

/* POST Login */
router.post('/', function(req, res, next) {
	const { username, password } = req.body
	const query = `Select * FROM users WHERE username = '${username}' AND password='${password}';`
	// const query = `INSERT INTO users(username, password, email, create_time) values('${username}', '${password}', '${email}', UNIX_TIMESTAMP(now()));`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
	})
})
module.exports = router
