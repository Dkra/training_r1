var mysql = require('mysql')
var msql = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'test123',
	port: 4000,
	database: 'training'
})

msql.connect()

module.exports = msql
