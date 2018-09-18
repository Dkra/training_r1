var express = require('express')
// var multer = require('multer')
var formidable = require('formidable')
const mime = require('mime')
var path = require('path')
const fs = require('fs')
var router = express.Router()

// Storage

// var storage = multer.diskStorage({
// 	destination: function(req, file, cb) {
// 		cb(null, `${__dirname}/../uploads`)
// 	},
// 	filename: function(req, file, cb) {
// 		cb(null, file.originalname)
// 	}
// })
// var upload = multer({ storage })

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

// POST File Upload (Multer)
// router.post('/', upload.single('file'), function(req, res, next) {
// 	res.sendStatus(200)
// })

/* File upload without library
router.post('/', function(req, res, next) {
	let body = ''
	req.on('data', chunk => {
		convertedChunk = chunk.toString('utf8')
		body += convertedChunk
	})
	req.on('end', () => {
		console.log(body)
		const directoryPath = path.join(__dirname, '/../uploads')
		const parsedDataArr = body.split('\n')
		let filename = parsedDataArr[1].match(/filename=\"([^"]*)\"/)[1]
		let content = parsedDataArr.slice(4, -2)

		// write file
		fs.writeFile(`${directoryPath}/${filename}`, content, function(err) {
			if (err) console.log(err)
			else {
				console.log('Write operation complete.')
				res.end('ok')
			}
		})
	})
})
*/
// GET Single File
router.get('/:filename', (req, res) => {
	var file = req.params.filename
	var fileLocation = path.join(`${__dirname}/../uploads`, file)

	const mimetype = mime.getType(fileLocation)
	res.setHeader('Content-Disposition', `attachment; filename="${file}"`)
	res.setHeader('Content-type', mimetype)

	var filestream = fs.createReadStream(fileLocation)
	filestream.pipe(res)
	// res.sendFile(fileLocation)
	// res.download(fileLocation, file)
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
