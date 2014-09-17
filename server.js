var http = require('http');
var url = require("url");
var path = require("path");
var fs = require("fs");
var jade = require("jade");

require("node-jsx").install();

var React = require("react");
var Item = require('./app/javascripts/Item');

http.createServer(function (req, res) {
  var uri = 'app' + url.parse(req.url).pathname,
      filename = path.join(process.cwd(), uri);

  if(req.url == '/'){
    var initialCount = {"initialCount":"2"};
    var ItemHtml = React.renderComponentToString(Item(initialCount));

    var data = {
      "title" : "Jade implementation",
      "app"   : ItemHtml,
      "data"  : initialCount
    };

    res.setHeader('Content-Type', 'text/html');
    res.end(jade.renderFile('app/index.jade', data));
  }else{
    fs.exists(filename, function (exist) {

      if(!exist){
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not Found\n");
        res.end();
        return false;
      }

      var readStream = fs.createReadStream(filename);

      readStream.pipe(res);
      readStream.on('error', function (err) {
        res.writeHead(500, {"Content-Type": "text/plain"});
        res.write(err + "\n");
        res.end();
        return false;
      });

      res.on('close', function () {
        readStream.destroy();
      });

    });
  }

}).listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');