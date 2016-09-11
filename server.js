var config = {
  port: process.env.PORT || 2403,
  env: process.env.NODE_ENV || 'development'
};

var deployd = require('deployd'),
    url = require('url');

// deployd
var server = deployd({
  port: config.port,
  env: config.env,
  db: { connectionString: process.env.MONGODB_URI || '' }
});

// start the server
server.listen();

// debug
server.on('listening', function() {
  console.log("Server is listening on port: " + config.port);
});

server.on('request', function(req, res) {
  if (url.parse(req.url, true).pathname == '/') {
    res.writeHead(302, { 'Location': '/dashboard' });
    res.end();
  }
});

// Deployd requires this
server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});
