// let moment = require('moment');
let express = require('express');
let logRequest = require('log-request');
// let mongo = require('mongodb');
let path = require("path");
let app = express();        // https://expressjs.com/en/guide/routing.html

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://54.171.85.189:27017/blues-notes";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });

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
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.get("/index.html", (req, res) => {
    console.log("serve index");
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/resources/main.js", (req, res) => {
    console.log("serve js");
    res.sendFile(path.join(__dirname + "/resources/main.js"));
});

app.get("/resources/style.css", (req, res) => {
    console.log("serve css");
    res.sendFile(path.join(__dirname + "/resources/style.css"));
});

// const simpleGit = require('simple-git');
// const remote_url = "https://github.com/GeorgeKesaev/blues-machine.git";
app.get("/code_update", (req, res) => {
    console.log("new git push");
    require('simple-git')()
        .exec(() => console.log('Starting pull...'))
        .pull((err, update) => {
            if (update && update.summary.changes) {
                require('child_process').exec('npm restart');
            }
        })
        .exec(() => console.log('pull done.'));
    res.sendStatus(200);
});

let port = 8001;
let address = '0.0.0.0';
const creds = require("./credentials");
let mongo = require('mongodb').MongoClient;

const credentials = require('./credentials.json');
const mongo_url = 'mongodb://' + credentials.user + ':' +
    credentials.password + '@' +
    credentials.server + ':' +
    credentials.port + '/' +
    credentials.db

app.listen(port, address, () => {
    console.log('listening on ' + port + '...');

    mongo.connect(mongo_url, { useNewUrlParser: true }, (err, client) => {
            console.log('Connected successfully to database');

            let db = client.db('blues-notes');
            let collection = db.collection('notes');
            collection.insertMany([{ name: "kkkk" }, { name: "param" }], (err, result) => {
                console.log(`Inserted ${result.result.n} records`);
                collection.find({ name: "gosha" }).toArray((err, result) => {
                    console.log(result);
                    client.close();
                });
            });
        });
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
