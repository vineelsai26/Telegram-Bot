const http = require('http');
const fs = require('fs');
const express = require("express");
const wakeUpDyno = require("./wakeDyno.js");
var exec = require('child_process').exec, child;

fs.readFile('./index.html', function (err, html) {
    if (err) throw err;
    http.createServer(function (request, response) {
        response.writeHeader(200, { "Content-Type": "text/html" });
        response.write(html);
        response.end();
    })
    console.log('Bot is live');
});

const DYNO_URL = "https://telegram-friday-bot.herokuapp.com/";

const PORT = process.env.PORT || 5000;

const app = express();

app.listen(PORT, () => {
    wakeUpDyno(DYNO_URL);
})

child = exec('node bot.js {{args}}',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });