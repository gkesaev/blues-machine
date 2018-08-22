let express = require('express');
let app = express();
let mongo = require('mongodb').MongoClient;

const credentials = require('./credentials.json');
const mongo_url = 'mongodb://' +  credentials.user + ':' +
                            credentials.password + '@' +
                            credentials.server + ':' +
                            credentials.port + '/' +
                            credentials.db

app.listen(8000, () => {
    console.log('listening on 8000...');

    // mongo.connect('mongodb://' +
    //     'server' + ':' + 'Huligan2018' + '@' + '54.171.85.189' + ':' + '27017' + '/' + 'blues-notes',
    mongo.connect(mongo_url,
        { useNewUrlParser: true }, (err, client) => {
        console.log('Connected successfully to database');

        let db = client.db('blues-notes');
        let collection = db.collection('notes');
        collection.insertMany([{name: "kkkk"}, {name: "param"}], (err, result) => {
            console.log(`Inserted ${result.result.n} records`);
            collection.find({name: "gosha"}).toArray((err, result) => {
                console.log(result);
                client.close();
            });
        });
    });
});
