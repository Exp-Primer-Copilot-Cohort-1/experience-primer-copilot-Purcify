// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var port = 8080;

var messages = [];

var server = http.createServer(function (req, res) {
  var urlParts = url.parse(req.url);
  if (urlParts.pathname === '/') {
    fs.readFile('./index.html', function(err, data) {
      res.end(data);
    });
  } else if (urlParts.pathname === '/messages') {
    if (req.method === 'POST') {
      var body = '';
      req.on('data', function(chunk) {
        body += chunk;
      });
      req.on('end', function() {
        messages.push(JSON.parse(body));
        res.end(JSON.stringify(messages));
      });
    } else if (req.method === 'GET') {
      res.end(JSON.stringify(messages));
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port);
console.log('Server listening on port ' + port);