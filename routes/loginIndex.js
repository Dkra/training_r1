var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	const username = req.session.username
	if (username) {
		// res.redirect('/', { title: 'Admin Page', username })
		res.redirect(200, '/')
	} else {
		res.render('login', { title: 'Login Page' })
	}
})

module.exports = router
