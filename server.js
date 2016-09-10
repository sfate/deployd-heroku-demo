var PORT = process.env.PORT || 2403;
var ENV = process.env.NODE_ENV || 'development';

var deployd = require('deployd');

// deployd
var server = deployd({
  env: ENV,
  db: {host:'localhost', port:27017, name:'test-app'}
});

// start the server
server.listen();

// debug
server.on('listening', function() {
  console.log("Server is listening on port: " + process.env.PORT);
});

// Deployd requires this
server.on('error', function(err) {
  console.error(err);
  process.nextTick(function() { // Give the server a chance to return an error
    process.exit();
  });
});
