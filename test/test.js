const expect = require('chai').expect
const sinon = require('sinon')

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
