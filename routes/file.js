var express = require('express')
var formidable = require('formidable')
const mime = require('mime')
var path = require('path')
const fs = require('fs')
var router = express.Router()

// GET File List
router.get('/', async (req, res, next) => {
	const directoryPath = path.join(__dirname, '/../uploads')
	const fileNames = fs.readdirSync(directoryPath)

	res.render('partial/fileTable', { fileNames })
})

// POST File Upload (Formidable)
router.post('/', function(req, res, next) {
	var form = new formidable.IncomingForm()

	form.parse(req)

	form.on('fileBegin', function(name, file) {
		const directoryPath = path.join(__dirname, '/../uploads')
		file.path = `${directoryPath}/${file.name}`
	})

	form.on('file', function(name, file) {
		console.log('Uploaded ' + file.name)
		res.sendStatus(200)
	})
})

// GET Single File
router.get('/:filename', (req, res) => {
	var file = req.params.filename
	var fileLocation = path.join(`${__dirname}/../uploads`, file)

	const mimetype = mime.getType(fileLocation)
	res.setHeader('Content-Disposition', `attachment; filename="${file}"`)
	res.setHeader('Content-type', mimetype)

	var filestream = fs.createReadStream(fileLocation)
	filestream.pipe(res)
})

// DELETE File
router.delete('/:filename', async (req, res, next) => {
	const directoryPath = path.join(__dirname, '/../uploads')
	fs.unlink(`${directoryPath}/${req.params.filename}`, err => {
		if (err) throw err
		res.sendStatus(200)
	})
})

module.exports = router
