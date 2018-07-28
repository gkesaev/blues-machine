let express = require('express');
let app = express();

console.log(__dirname);

app.use(express.static('client'));

app.get('/ancestry', (req, res) =>
        res.sendFile(`${__dirname}/materials/ancestry.json`));
app.get('/ancestry/:born', (req, res) =>
    res.sendFile(`${__dirname}/materials/${req.param.born}.json`));

app.listen(8000, () => console.log('listening on 8000 ...'));
