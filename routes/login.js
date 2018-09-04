var express = require('express')
const msql = require('../database/connection')
var router = express.Router()

/* POST Login */
router.post('/', function(req, res, next) {
	const { username, password } = req.body
	const query = `Select * FROM users WHERE username = '${username}' AND password=MD5('${password}') AND isAdmin=1;`
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
