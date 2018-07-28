let moment = require('moment');
let express = require('express');
let logRequest = require('log-request');

let app = express();

app.use(express.static('client'));

app.get('/api/moment', logRequest, (req, res) => {
    handleMoment(req, res, req.query);
});
app.get('/the-answer', logRequest, (req, res) => {
    res.send(String(42));
});

app.listen(8000);

function onRequest(request, response) {
    let urlObj = url.parse(request.url);

    if (urlObj.pathname === '/api/moment') {
        let params = qs.parse(urlObj.query);
        handleMoment(request, response, params);
        return;
    }

    getFile(urlObj.pathname)
        .then(data => handleFile(request, response, data))
        .catch(err => handleFileError(request, response, err))
}
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
    response.end(`data`);
}