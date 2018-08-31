var config = require('../config')
console.log('config:', config)

var mysql = require('mysql')
var msql = mysql.createConnection({
	host: config.env === 'environment=dev' ? 'mydb' : 'localhost',
	user: 'root',
	password: 'test123',
	port: config.env === 'environment=dev' ? 3306 : 4000,
	database: 'training'
})

msql.connect()

module.exports = msql
