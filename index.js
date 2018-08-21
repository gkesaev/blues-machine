let moment = require('moment');
let express = require('express');
let logRequest = require('log-request');

let path = require("path");

let app = express();
console.log(__dirname);
app.use(express.static('client'));

app.get('/api/moment', logRequest, (req, res) => {
    handleMoment(req, res, req.query);
});
app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});
app.get("/", (req, res) => {
    console.log("huynayaaaaaaaa");
    res.sendFile(path.join(__dirname + '/index.html'));
    res.sendFile(path.join(__dirname + '/resources/style.css'));
    // res.sendFile(path.join(__dirname + '/resources/main.js'));
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

// function onRequest(request, response) {
//     console.log("handling request");
//     let urlObj = url.parse(request.url);

//     if (urlObj.pathname === '/api/moment') {
//         let params = qs.parse(urlObj.query);
//         handleMoment(request, response, params);
//         return;
//     }

//     // if (urlObj.pathname === '/') {
//     //     console.log(urlObj.pathname);
//     //     urlObj.pathname = 'index.html'
//     // }
//     getFile(urlObj.pathname)
//         .then(data => handleFile(request, response, data))
//         .catch(err => handleFileError(request, response, err))
// }
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
