const request = require('supertest')
const app = require('../app')
const expect = require('chai').expect
const sinon = require('sinon')

// request(app).get('/login').expect(200).end===]-[p0[]]

const chainer = cb => {
	cb()
	cb()
	cb()
}
describe('test chainer function', () => {
	it('test callback is called', () => {
		var testCB = sinon.stub()
		chainer(testCB)
		console.log('testCB.callCount:', testCB.callCount)
		console.log('testCB:', testCB)
	})
})

// Test Routing
describe('GET /login', () => {
	it('', () => {})
})

describe('POST /login', () => {
	it('', () => {})
})

describe('GET /users', () => {
	it('', () => {})
})
