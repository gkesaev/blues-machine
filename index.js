console.log("running in: " + __dirname);


const path = require('path');
const PORT = process.env.PORT || 8000;


let moment = require('moment');
let logRequest = require('log-request');
let express = require('express');
let assert = require('assert');
let app = express();        // https://expressjs.com/en/guide/routing.html
app.use('/resources', express.static(path.join(__dirname, 'public')));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content - Type, Accept");
//     next();
// });

let fs = require('fs');
if (fs.existsSync('./credentials.json')){
    // const f = require('./credentials.json');
    var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
}
else {
    var credentials = process.env;
}


// var uri = "mongodb+srv://user:pass@sever/db";  // + "?retryWrites=true";
const uri = 'mongodb+srv://' + credentials.mongoUser + ':' +
    credentials.mongoPass + '@' +
    credentials.mongoServer + '/' +
    // credentials.port + '/' +
    credentials.mongoDB
    + "?retryWrites=true";
console.log(uri);
var MongoClient = require('mongodb').MongoClient;


app.post("/save_song", (req, res) => {
    console.log(moment().format() + " requested to save song");
    console.log("save song: " + JSON.stringify(req.body));
    res.setHeader('Content-Type', 'application/json');
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
        // assert.equal(null, err);
        if (err) throw err;
        console.log("Connected correctly to server");

        const dbo = db.db("blues-notes");
        let song = req.body;
        const collection = dbo.collection("notes");
        collection.insertOne(song, function (err, res) {
            if (err) throw err;
            else {
                console.log("1 song inserted");
                res.send(JSON.stringify(res));
                db.close();
            }
        });
    });
});


var ObjectID = require('mongodb').ObjectID;


app.get("/get_song", (req, res) => {
    console.log(moment().format() + " requested to load/get a song");
    console.log("get song: " + (req.body));
    res.setHeader('Content-Type', 'application/json');
    MongoClient.connect(uri, { useNewUrlParser: true }, function (err, db) {
        // assert.equal(null, err);
        if (err) throw err;
        console.log("Connected correctly to server");

        const dbo = db.db("blues-notes");
        dbo.collection("notes").findOne({ _id: new ObjectID(req.body.songID) }, (err, res) => {
            if (err) throw err;
            else {
                console.log("1 song found");
                console.log(JSON.stringify(res));
                res.send(JSON.stringify(res));
                db.close();
            }
        });
    });
});


app.get("/countSongs", (req, res) => {
    console.log(moment().format() + " counting songs");
    // collection.count({ name: "gosha" });

    // MongoClient.connect(mongo_url, { useNewUrlParser: true }, (err, client) => {
    //     console.log('Connected successfully to database');

    //     let db = client.db(credentials.db);
    //     let collection = db.collection(credentials.collection);
    //     collection.insertMany([{ name: "kkkk" }, { name: "param" }], (err, result) => {
    //         console.log(`Inserted ${result.result.n} records`);
    //         // collection.find({ name: "gosha" }).toArray((err, result) => {
    //         collection.count({ name: "gosha" }).toArray((err, result) => {
    //             console.log(result);
    //             res.send(String(result));
    //             client.close();
    //         });

    //     });
    // });
});


app.get("/", (req, res) => {
    console.log(moment().format() + " serve index");
    res.sendFile(path.join(__dirname + '/index.html'));
}).get("/index.html", (req, res) => {
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


app.get('/api/moment', logRequest, (req, res) => {
    console.log(moment().format() + " test moment for fun");
    res.send(moment().format());
    // handleMoment(req, res, req.query); //TODO: remove
});


app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});


// instead of sending 400
app.get('*', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, '42.html'));
});


// Start server
let server = app.listen(PORT, "", function () {

    let host = server.address().address
    let port = server.address().port;
    const computerName = require('os').hostname();
    console.log("name: " + computerName);
    console.log("BluesMachine app listening at http://%s:%s", host, port);
})
