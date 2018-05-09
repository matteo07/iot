module.exports = function (app) {
  /* serves main page */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });

  app.post("/user/add", function(req, res) {
    res.send("OK");
  });

  /* serves all the static files */
  app.get(/^(.+)$/, function(req, res){
      res.sendFile( __dirname + req.params[0]);
  });
}
