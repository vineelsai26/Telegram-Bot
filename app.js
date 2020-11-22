const http = require('http')
const fs = require('fs')
// const wakeUpDyno = require('./wakeDyno.js')
const exec = require('child_process').exec

// const DYNO_URL = 'https://friday-telegram-bot.herokuapp.com/'

const PORT = process.env.PORT || 5000

fs.readFile('./index.html', function (err, html) {
	if (err) throw err
	http.createServer(function (request, response) {
		response.writeHeader(200, { 'Content-Type': 'text/html' })
		response.write(html)
		response.end()
	}).listen(PORT, () => {
		// wakeUpDyno(DYNO_URL)
	})
	console.log('Bot is live')
})

exec('node bot.js', function (error, stdout, stderr) {
	console.log('stdout: ' + stdout)
	console.log('stderr: ' + stderr)
	if (error !== null) {
		console.log('exec error: ' + error)
	}
})
