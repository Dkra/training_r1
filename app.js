var createError = require('http-errors')
var express = require('express')
var session = require('express-session')
var path = require('path')
var logger = require('morgan')

// Router
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var fileRouter = require('./routes/file')
var loginRouter = require('./routes/login')
var logoutRouter = require('./routes/logout')
var loginIndexRouter = require('./routes/loginIndex')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(
	session({
		secret: 'A key for encrpty'
	})
)

app.use('/', indexRouter)
app.use('/login', loginIndexRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/users', usersRouter)
app.use('/api/files', fileRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('error')
})

module.exports = app
