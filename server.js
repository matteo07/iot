var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// set the static files location ==========================
app.use(express.static('./public'));

// router =================================================
require('./router.js')(app,io);

var port = process.env.PORT || 5000;
http.listen(port, function(){
  console.log("Sensors server listening on port " + port);
});
