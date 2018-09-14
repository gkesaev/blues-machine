#!/usr/bin/env node

const path = require('path');
const PORT = process.env.PORT || 8000;

let moment = require('moment');
let logRequest = require('log-request');
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

let songRouter = express.Router();
songRouter.get('/:id', findSongByID);
songRouter.post('/', storeSong);

let app = express();        // https://expressjs.com/en/guide/routing.html
app.use(bodyParser.json({ type: 'application/json' }))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/song', songRouter)
    .use('/', express.static(path.join(__dirname, 'public')))
    .get('/countSongs', countSongsInCollection);;

// load credentials from file for local use or process.env if on heroku
if (fs.existsSync('./credentials.json')) {
    var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
}
else {
    var credentials = process.env;
}

const mongo_uri = 'mongodb+srv://' + credentials.mongoUser + ':' +
            credentials.mongoPass + '@' +
            credentials.mongoServer + '/' +
            credentials.mongoDB
            + "?retryWrites=true";

function storeSong(req, res) {
    console.log(moment().format() + " requested to save a song");
    MongoClient.connect(mongo_uri, { useNewUrlParser: true }, function (err, db) {
        // assert.equal(null, err);
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({
                errors: ['Couldnt connect to server']
            });
        }
        console.log("Connected correctly to Mongo server");
        const dbo = db.db("blues-notes");
        let song = req.body;
        const collection = dbo.collection("notes");
        collection.insertOne(song, function (err, result) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                return res.json({
                    errors: ['Failed to save a song']
                })
            }
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 201;
            let saved_song_id = result.ops[0]._id;
            console.log("one song inserted into db, song id: " + saved_song_id);
            res.json(saved_song_id);
            db.close();
        });
    });
}

function findSongByID(req, res) {
    let song_id = req.params.id
    console.log("Requested to load/get a song" + song_id);

    MongoClient.connect(mongo_uri, { useNewUrlParser: true }, function (err, db) {
        if (err){
            console.error(err);
            res.statusCode = 500;
            return res.json({
                errors: ['Couldnt find song']
            });
        }
        console.log("Connected correctly to Mongo server");

        // if string might be object ID on mongo, regex expression
        if (song_id.match(/^[0-9a-fA-F]{24}$/)) {
            const dbo = db.db("blues-notes");
            dbo.collection("notes").findOne({ _id: new ObjectID(song_id) }, (err, result) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    return res.json({
                        errors: ['Couldnt find a song']
                    });
                }
                if (typeof result !== 'undefined' && result){

                    console.log("Found one song, sending to client");
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 200;
                    result.errors = [];
                    res.json(result);
                    db.close();
                }
                else {
                    console.error("No song with id " + song_id);
                    res.setHeader('Content-Type', 'application/json');
                    res.statusCode = 404;
                    return res.json({
                        errors: ['There are no songs with such ID.'],
                        notes: []
                    });
                }
            });
        } else {
            console.error("Not an object id");
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 404;
            return res.json({
                errors: ['This is not an object id'],
                notes: []
            });
        }
    });
}

function countSongsInCollection (req, res){
    console.log("Counting songs");

    MongoClient.connect(mongo_uri, { useNewUrlParser: true }, function (err, db) {
        if (err) {
            console.error(err);
            res.statusCode = 500;
            return res.json({
                errors: ['Couldnt count songs']
            });
        }
        console.log("Connected to Mongo server");

        const dbo = db.db("blues-notes");
        let result = dbo.collection("notes").countDocuments();
        result.then(r => {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            console.log('There are ' + r + "songs saved in db.");
            res.json(r);
        }).catch(err => {
            console.error("Count failed: " + err);
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            return res.json(-1);
        })
        db.close();
    })
}

app.get("/", (req, res) => {
    console.log(moment().format() + " serve index");
    res.sendFile(path.join(__dirname + '/index.html'));
}).get("/index.html", (req, res) => {
    console.log(moment().format() + " serve index");
    res.sendFile(path.join(__dirname + '/index.html'));
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
    res.statusCode = 400;
    res.sendFile(path.join(__dirname, '42.html'));
});

const server = app.listen(PORT, "", function () {
    let host = server.address().address
    let port = server.address().port;
    const computerName = require('os').hostname();
    console.log("name: " + computerName);
    console.log("BluesMachine app listening at http://%s:%s", host, port);
})
