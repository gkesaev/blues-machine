console.log("running in: " + __dirname);


const path = require('path');
const PORT = process.env.PORT || 8000;


let moment = require('moment');
let logRequest = require('log-request');
let express = require('express');
// let app = express();        // https://expressjs.com/en/guide/routing.html
// app.use(express.static('client'));
let app = express();

// app.use(express.static(
    // path.join(__dirname, 'public')))
    // .set('views', path.join(__dirname, 'views'))
    // .engine('html', require('ejs').renderFile)
    // .set('view engine', 'html')
    // .get('/', (req, res) => res.render('pages/index'))
    // .get('/cool', (req, res) => res.send(cool()))

// let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));


let port = 8001;
let html_address = '0.0.0.0';
let mongo = require('mongodb').MongoClient;

let fs = require('fs');
if (fs.existsSync('./credentials.json')){
    // const f = require('./credentials.json');
    var credentials = JSON.parse(fs.readFileSync('./credentials.json', 'utf8'));
}
else {
    var credentials = process.env;
}
// const mongo_url = 'mongodb://' + credentials.mongoUser + ':' +
//     credentials.mongoPass + '@' +
//                                 credentials.db_server + ':' +
//                                 credentials.port + '/' +
//                                 credentials.db

const uri = 'mongodb+srv://' + credentials.mongoUser + ':' +
    credentials.mongoPass + '@' +
    credentials.mongoServer + '/' +
    // credentials.port + '/' +
    credentials.mongoDB;
console.log(uri);
var MongoClient = require('mongodb').MongoClient;

// var uri = "mongodb+srv://heroku:KgfrWRrVi4puRjgc@bluesmachine-nyn8p.gcp.mongodb.net/blues-notes";// + "?retryWrites=true";
MongoClient.connect(uri, { useNewUrlParser: true }, function (err, client) {
    const collection = client.db("blues-notes").collection("notes");
    // perform actions on the collection object
    collection.insertMany([{ name: "gosha", age: 32 }, { name: "gosha", age: 18 }], (err, result) => {
        // console.log(`Inserted ${result.result.n} records`);
        // collection.find({ name: "gosha" }).toArray((err, result) => {
        // result = collection.estimatedDocumentCount({ name: "gosha" });//.toArray((err, result) => {
            // console.log(result);
            // res.send(String(result));
            // client.close();
        // });
    });
    client.close();
});

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

// let path = require("path");

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

app.post("/save_song", (req, res) => {
    console.log(moment().format() + " requested to save song");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({"song_id" : 123456789}));
});

app.get("/get_song", (req, res) => {
    console.log(moment().format() + " requested to get song");
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "song_id": 123456789, "notes" : ["A1", "G3"] }));
});

app.post("/code_update", (req, res) => {
    console.log(moment().format() + " update repo request from GitHub");
    require('simple-git')()
        .exec(() => console.log(moment().format() + 'Checking out ...'))
        .pull((err, update) => {
            if (update && update.summary.changes) {
                // console.log(moment().format() + "restarting")
                // require('child_process').exec('npm restart');
            }
            if (err) {
                console.error(err);
            }
        })
        .exec(() => console.log(moment().format() + ' pull done.'));
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
                if (err) {
                    console.error(err);
                }
            })
            .exec(() => console.log(moment().format() + ' Checkout done.'))
            .exec(() => res.redirect('/index.html'));
        res.sendFile(path.join(__dirname + '/index.html'));
    }
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

// var server = app.listen(port, html_address, function () {

var server = app.listen(PORT, "", function () {

    let host = server.address().address
    let port = server.address().port;
    const computerName = require('os').hostname();
    console.log("name: " + computerName);
    if (computerName !== "ip-172-31-34-177"){
        console.log("BluesMachine app listening at http://%s:%s", host, port);
    }
    else {
        const https = require('https');
        https.get('https://api.ipify.org/', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                // console.log(JSON.parse(data).explanation);
                console.log("BluesMachine app listening at http://%s:%s", data, port);
            });

        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    }
})
