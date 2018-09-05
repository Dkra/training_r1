var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
	const username = req.session.username
	req.session.views ? req.session.views++ : (req.session.views = 1)
	if (!username) {
		res.redirect('/login')
	} else {
		res.render('index', { title: 'Admin Page', username })
	}
})

module.exports = router
