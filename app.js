const http = require('http');
const fs = require('fs');
var exec = require('child_process').exec, child;

const PORT = process.env.PORT || 5000;

fs.readFile('./index.html', function (err, html) {
    if (err) throw err;
    http.createServer(function (request, response) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    }).listen(PORT);
    console.log('Bot is live');
});

child = exec('node bot.js {{args}}',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });