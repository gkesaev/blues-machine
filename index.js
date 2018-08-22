console.log("running in: " + __dirname);

let moment = require('moment');
let logRequest = require('log-request');
let express = require('express');
let app = express();        // https://expressjs.com/en/guide/routing.html
app.use(express.static('client'));

let port = 8001;
let html_address = '0.0.0.0';
let mongo = require('mongodb').MongoClient;
const credentials = require('./credentials.json');
const mongo_url = 'mongodb://' + credentials.user + ':' +
                                credentials.password + '@' +
                                credentials.db_server + ':' +
                                credentials.port + '/' +
                                credentials.db

app.get("/count", (req, res) => {
    console.log(moment().format() + " counting songs");
    collection.count({ name: "gosha" });

    mongo.connect(mongo_url, { useNewUrlParser: true }, (err, client) => {
        console.log('Connected successfully to database');

        let db = client.db(credentials.db);
        let collection = db.collection(credentials.collection);
        collection.insertMany([{ name: "kkkk" }, { name: "param" }], (err, result) => {
            console.log(`Inserted ${result.result.n} records`);
            // collection.find({ name: "gosha" }).toArray((err, result) => {
            collection.count({ name: "gosha" }).toArray((err, result) => {
                console.log(result);
                res.send(String(result));
                client.close();
            });

        });
    });
});

let path = require("path");

app.get("/", (req, res) => {
    console.log(moment().format() + " serve index");
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/index.html", (req, res) => {
    console.log(moment().format() + " serve index");
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

app.get("/code_update", (req, res) => {
    console.log(moment().format() + " update repo request from GitHub");
    require('simple-git')()
        .exec(() => console.log(moment().format() + 'Checking out ...'))
        .pull((err, update) => {
            if (update && update.summary.changes) {
                // console.log(moment().format() + "restarting")
                // require('child_process').exec('npm restart');
            }
        })
        .exec(() => console.log(moment().format() + 'pull done.'));
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/checkout", (req, res) => {
    // let branch = req.params.branch;
    let branch = req.query.branch;
    console.log(moment().format() + " requested branch: " + branch);
    if (branch === 'george' || branch === 'sergey' || branch === 'master'){
        console.log(moment().format() + " checkout " + branch + " branch");
        require('simple-git')()
            .exec(() => console.log(moment().format() + ' Checking out ...'))
            .checkout('george', (err, update) => {
                if (update && update.summary.changes) {
                    // console.log(moment().format() + "restarting")
                    // require('child_process').exec('npm restart');
                }
            })
            .exec(() => console.log(moment().format() + ' Checkout done.'))
            .exec(() => res.redirect('/index.html'));
        // res.sendFile(path.join(__dirname + '/index.html'));
    }
    else {
        res.sendStatus(400);
    }
});

app.get('/api/moment', logRequest, (req, res) => {
    console.log(moment().format() + " test moment for fun");
    handleMoment(req, res, req.query);
});

app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});


var server = app.listen(port, html_address, function () {

    let host = server.address().address
    let port = server.address().port

    console.log("BluesMachine app listening at http://%s:%s", host, port)
})
