var express = require('express')
var router = express.Router()

/* Logout. */
router.get('/', function(req, res, next) {
	req.session.destroy()
	res.render('login', { title: 'Login Page' })
})

module.exports = router
