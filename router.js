module.exports = function (app) {
  var sensorsMap = {"1": false, "2": true, "3": "a", "4": "b", "5": "c" }
  /* serves main page */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });

  app.get("/sensor/:sensorID", function(req, res) {
    console.log("asked sensor " + req.params.sensorID);
      console.log("value of sensor " + sensorsMap[req.params.sensorID]);
     res.send(sensorsMap[req.params.sensorID]);
  });

  app.post("/sensor/:id/:value", function(req, res) {
    console.log("posting value " + req.params.value);
    sensorsMap[req.params.id] = req.params.value;
    console.log("value of " + req.params.id + ": " + sensorsMap[req.params.id]);
    res.send("OK");
  });

  app.post("/user/add", function(req, res) {
    res.send("OK");
  });

  /* serves all the static files */
  app.get(/^(.+)$/, function(req, res){
      res.sendFile( __dirname + req.params[0]);
  });
}
