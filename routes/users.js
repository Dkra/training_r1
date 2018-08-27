var express = require('express')
var msql = require('../database/connection')
var router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
	msql.query('SELECT * from users', function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
		msql.end()
	})
})

module.exports = router
