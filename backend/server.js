var express = require('express');
var bodyParser = require("body-parser");
var path = require('path');
var http = require('http');
var cors = require('cors');
var app = express();


var routes = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use(express.static(path.join(__dirname, 'dist')));



app.use('/api', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../giggers-app/src/index.html'));
});

// app.use(cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
  const port = process.env.PORT || '3000';
  app.set('port', port); 

const server = http.createServer(app);

server.listen(port, () => console.log(`We got our server on port: ${port}`));
