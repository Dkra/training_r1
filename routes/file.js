var express = require('express')
var multer = require('multer')
var path = require('path')
const fs = require('fs')
var router = express.Router()

// Storage
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, `${__dirname}/../uploads`)
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname)
	}
})
var upload = multer({ storage })

// GET File List
router.get('/', async (req, res, next) => {
	const directoryPath = path.join(__dirname, '/../uploads')
	const fileNames = fs.readdirSync(directoryPath)

	res.render('partial/fileTable', { fileNames })
})

// POST File Upload
router.post('/', upload.single('file'), function(req, res, next) {
	res.sendStatus(200)
})

// GET Single File
router.get('/:filename', (req, res) => {
	var file = req.params.filename
	var fileLocation = path.join(`${__dirname}/../uploads`, file)
	res.download(fileLocation, file)
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
