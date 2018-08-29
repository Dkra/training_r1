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
	const query = `Select * FROM users WHERE username = '${username}' AND password='${password}' AND isAdmin=1;`
	console.log('username:', username)
	console.log('password:', password)
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		if (results.length === 0) {
			res
				.status(401)
				.send('Username or Password Incorrect or Admin is not exist!')
		} else {
			res.send(JSON.stringify({ status: 200, error: null, response: results }))
		}
	})
})
module.exports = router
