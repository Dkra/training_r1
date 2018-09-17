const app = require('../app')
var expect = require('chai').expect
const request = require('supertest')
/*
describe('Testing Users APIs', () => {
	let sessionId, newUserId

	// Get session
	before(function(done) {
		request(app)
			.post('/api/login')
			.send({
				username: 'admin',
				password: 'admin123'
			})
			.end(function(err, res) {
				sessionId = res.headers['set-cookie'][0].slice(12)
				if (err) return done(err)
				done()
			})
	})

	describe('GET /api/users', () => {
		it('should return status 200', function(done) {
			request(app)
				.get('/login')
				.set({ cookie: { 'connect.sid': sessionId } })
				.expect(200)
				.expect(function(res) {
					expect(res.text).to.have.string('<title>Admin Login Page</title>')
				})
				.end(function(err, res) {
					if (err) return done(err)
					done()
				})
		})
	})

	describe('POST /api/users', function(done) {
		it('shoud create a user in database', function(done) {
			request(app)
				.post('/api/users')
				.send({
					username: 'testUser1',
					password: 'testUser',
					email: 'testUser@mail.com'
				})
				.expect(200)
				.expect(res => {
					const resParsed = JSON.parse(res.text)
					newUserId = resParsed.response.insertId
					expect(newUserId).to.be.a('number')
				})
				.end(function(err, res) {
					if (err) return done(err)
					done()
				})
		})
	})

	describe('PUT /api/users/:id', function(done) {
		it('shoud Update a user in database', function(done) {
			request(app)
				.put(`/api/users/${newUserId}`)
				.send({
					email: 'test@gmail.com'
				})
				.expect(200)
				.expect(res => {
					expect(JSON.parse(res.text).msg).to.equal('updated!')
				})
				.end(function(err, res) {
					if (err) return done(err)
					done()
				})
		})
	})

	describe('DELETE /api/users/:id', function(done) {
		it('shoud Delete a user in database', function(done) {
			request(app)
				.delete(`/api/users/${newUserId}`)
				.expect(200)
				.expect(res => {
					expect(JSON.parse(res.text).msg).to.equal('deleted!')
				})
				.end(function(err, res) {
					if (err) return done(err)
					done()
				})
		})
	})
})
*/
