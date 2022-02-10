const http = require('http')
const fs = require('fs')
const exec = require('child_process').exec

const PORT = process.env.PORT || 5000

fs.readFile('./index.html', function (err, html) {
	if (err) throw err
	http.createServer(function (req, res) {
		res.writeHeader(200, { 'Content-Type': 'text/html' })
		res.write(html)
		res.end()
	}).listen(PORT, () => {
		console.log('Bot is live')
	})
})

exec('node bot.js', function (error, stdout, stderr) {
	console.log('stdout: ' + stdout)
	console.log('stderr: ' + stderr)
	if (error !== null) {
		console.log('exec error: ' + error)
	}
})
