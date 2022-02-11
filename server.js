const exec = require('child_process').exec
const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

app.set('view engine', 'ejs')
app.use(express.static('public'))


exec('node bot.js', function (error, stdout, stderr) {
	console.log('stdout: ' + stdout)
	console.log('stderr: ' + stderr)
	if (error !== null) {
		console.log('exec error: ' + error)
	}
})

app.get('/', (req, res) => {
	res.render('index.ejs')
})

app.listen(PORT, () =>
	console.log("Bot Is Live!")
)
