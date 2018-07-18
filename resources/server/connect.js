let http = require('http');
let server = http.createServer(onRequest);

server.listen(8001);

function onRequest(request, response){
    let responseTime = new Date();
    
    response.end('Request ' + request.url + ' serverd at ' +  responseTime.toLocaleString());
}