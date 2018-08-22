let express = require('express');
let app = express();
let mongo = require('mongodb').MongoClient;

app.listen(8000, () => {
    console.log('listening on 8000...');

    mongo.connect('mongodb://' +
        'server' + ':' + 'Huligan2018' + '@' + '54.171.85.189' + ':' + '27017' + '/' + 'blues-notes',
        { useNewUrlParser: true }, (err, client) => {
        console.log('Connected successfully to database');

        let db = client.db('blues-notes');
        let collection = db.collection('notes');
        collection.insertMany([{name: "kkkk"}, {name: "param"}], (err, result) => {
            console.log(`Inserted ${result.result.n} records`);
            collection.find({name: "gosha"}).toArray((err, result) => {
                consoleד.log(result);
                client.close();
            });
        });
    });
});




// var mongo = require('mongodb');
// var MongoClient = mongo.MongoClient;
// MongoClient.connect('mongodb://' +
//                     'server' + ':' + 'Huligan2018' + '@' + '54.171.85.189' + ':' + '27017' + '/' + 'blues-notes',
//                     {useNewUrlParser: true},
//                     function (err, client) {
//     if (err)
//         console.log(err);
//     else {
//         console.log('Mongo Conn....');
//         let db = client.connect('notes');
//     }
// });
// //for local server
// //in local server DBPASSWOAD and DBusername not required
// MongoClient.connect('mongodb://' + DATABASEHOST + ':' + DATABASEPORT + '/' + DATABASENAME, function (err, db) {
//     if (err)
//         console.log(err);
//     else {
//         console.log('Mongo Conn....');

//     }
// });

// var Db = require('mongodb').Db,
//     MongoClient = require('mongodb').MongoClient,
//     Server = require('mongodb').Server,
//     ReplSetServers = require('mongodb').ReplSetServers,
//     ObjectID = require('mongodb').ObjectID,
//     Binary = require('mongodb').Binary,
//     GridStore = require('mongodb').GridStore,
//     Code = require('mongodb').Code,
//     // BSON = require('mongodb').pure().BSON,
//     assert = require('assert');

// var db = new Db('blues-notes', new Server("54.171.85.189", 27017,
//     { auto_reconnect: false, poolSize: 4 }), { w: 0, native_parser: false });

// // Establish connection to db
// db.open(function (err, db) {
//     assert.equal(null, err);

//     // // Add a user to the database
//     // db.addUser('user', 'name', function (err, result) {
//     //     assert.equal(null, err);
//     let myobj = [
//         { name: 'John', address: 'Highway 71' },
//         { name: 'Peter', address: 'Lowstreet 4' },
//         { name: 'Amy', address: 'Apple st 652' },
//         { name: 'Hannah', address: 'Mountain 21' },
//         { name: 'Michael', address: 'Valley 345' },
//         { name: 'Sandy', address: 'Ocean blvd 2' },
//         { name: 'Betty', address: 'Green Grass 1' },
//         { name: 'Richard', address: 'Sky st 331' },
//         { name: 'Susan', address: 'One way 98' },
//         { name: 'Vicky', address: 'Yellow Garden 2' },
//         { name: 'Ben', address: 'Park Lane 38' },
//         { name: 'William', address: 'Central st 954' },
//         { name: 'Chuck', address: 'Main Road 989' },
//         { name: 'Viola', address: 'Sideway 1633' }
//     ];
//     db.collection("notes").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         // Authenticate
//         db.authenticate('admin', 'mongo@lab', function (err, result) {
//             assert.equal(true, result);

//             db.close();
//         });
//     });
// });




// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://54.171.85.189:27017/blues-notes";

// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = [
//         { name: 'John', address: 'Highway 71' },
//         { name: 'Peter', address: 'Lowstreet 4' },
//         { name: 'Amy', address: 'Apple st 652' },
//         { name: 'Hannah', address: 'Mountain 21' },
//         { name: 'Michael', address: 'Valley 345' },
//         { name: 'Sandy', address: 'Ocean blvd 2' },
//         { name: 'Betty', address: 'Green Grass 1' },
//         { name: 'Richard', address: 'Sky st 331' },
//         { name: 'Susan', address: 'One way 98' },
//         { name: 'Vicky', address: 'Yellow Garden 2' },
//         { name: 'Ben', address: 'Park Lane 38' },
//         { name: 'William', address: 'Central st 954' },
//         { name: 'Chuck', address: 'Main Road 989' },
//         { name: 'Viola', address: 'Sideway 1633' }
//     ];
//     dbo.collection("customers").insertMany(myobj, function (err, res) {
//         if (err) throw err;
//         console.log("Number of documents inserted: " + res.insertedCount);
//         db.close();
//     });
// });