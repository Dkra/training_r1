var config = require('../config')
console.log('config:', config)

var mysql = require('mysql')
const settings = {
	host: config.env === 'environment=docker' ? 'mydb' : 'localhost',
	user: 'root',
	password: 'test123',
	port: config.env === 'environment=docker' ? 3306 : 4000,
	database: 'training',
	insecureAuth: true
}

var msql = mysql.createConnection(settings)

msql.connect(function(err) {
	if (err) throw err
})

module.exports = msql
