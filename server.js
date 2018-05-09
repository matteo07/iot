var express = require("express");
var app = express();

// set the static files location ==========================
app.use(express.static('./public'));

// router =================================================
require('./router.js')(app);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Sensors server listening on port " + port);
});
