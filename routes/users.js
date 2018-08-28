const express = require('express')
const msql = require('../database/connection')
const router = express.Router()

/*
const userSqlMap = {
  add: 'insert into user(username, password) values(?, ?)',
  deleteById: 'delete from user where id = ?',
  update: 'update user set username=?, password=? where id=?',
  list: 'select * from user',
  getById: 'select * from user where id = ?'
};
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
	msql.query('SELECT * from users;', function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
		msql.end()
	})
})

/* POST A user */
router.post('/', function(req, res, next) {
	const query = `insert into users(username, password, email, create_time) values('roger', 'password123','dkra4741@gmail.com', UNIX_TIMESTAMP(now()));`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
		msql.end()
	})
})

/* Delete A user */
router.delete('/:id', function(req, res, next) {
	const query = `DELETE FROM users WHERE id = 4;`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
		msql.end()
	})
})

/* Edit A user */
router.put('/:id', function(req, res, next) {
	const query = `update users set username="test", password="test", email="asdf", update_time=UNIX_TIMESTAMP(now()) where id=5;`
	msql.query(query, function(error, results, fields) {
		if (error) throw error
		res.send(JSON.stringify({ status: 200, error: null, response: results }))
		msql.end()
	})
})

module.exports = router
