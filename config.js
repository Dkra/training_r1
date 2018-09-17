const settings = {
	env: process.argv[2] === '-w' ? 'environment=test' : process.argv[2]
}
module.exports = settings
