var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set the static files location ==========================
app.use(express.static('./public'));

// router =================================================
require('./router.js')(app);



//for testing, we're just going to send data to the client every second
setInterval( function() {

  /*
    our message we want to send to the client: in this case it's just a random
    number that we generate on the server
  */
  var msg = Math.random();
  io.emit('greenLight', msg);

}, 2000);


var port = process.env.PORT || 5000;
//app.listen(port, function() {
http.listen(port, function(){
  console.log("Sensors server listening on port " + port);
});
