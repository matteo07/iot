module.exports = function (app) {
  /* serves main page */
  app.get("/", function(req, res) {
     res.sendfile('index.html')
  });

   app.post("/user/add", function(req, res) {
     /* some server side logic */
     res.send("OK");
   });

  /* serves all the static files */
  app.get(/^(.+)$/, function(req, res){
      console.log('static file request : ' + req.params);
      res.sendFile( __dirname + req.params[0]);
  });
}
