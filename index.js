let moment = require('moment');
let express = require('express');
let logRequest = require('log-request');
let mongo = require('mongodb');
let path = require("path");
let app = express();        // https://expressjs.com/en/guide/routing.html

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://54.171.85.189:27017/blues-notes";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});

console.log(__dirname);
app.use(express.static('client'));

app.get('/api/moment', logRequest, (req, res) => {
    handleMoment(req, res, req.query);
});
app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});
app.get("/", (req, res) => {
    console.log("serve index");
    res.sendFile(path.join('{__dirname}/index.html'));
})
app.get("/index.html", (req, res) => {
    console.log("serve index");
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get("/resources/main.js", (req, res) => {
    console.log("serve js");
    res.sendFile(path.join(__dirname + "/resources/main.js"));
})

app.get("/resources/style.css", (req, res) => {
    console.log("serve css");
    res.sendFile(path.join(__dirname + "/resources/style.css"));
})

let port = 8000
let address = '0.0.0.0'
app.listen(port, address, () => {
    console.log("server listening on: http://" + address + ":" + port)
});

function handleFile(request, response, data) {
    response.end(data);
}
function handleFileError(request, response, err) {
    if (err.code === 'ENOENT') {
        sendStatus(request, response, 404);
        return;
    }
    sendStatus(request, response, 500);
}
function handleMoment(request, response, params) {
    response.end('data');
}
