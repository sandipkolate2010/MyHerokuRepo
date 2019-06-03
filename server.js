//Install express server
const express = require('express');
const path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var issue = require('./issueroute');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/issuetracker'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/issuetracker/index.html'));
});


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', issue);
app.use('/issues', issue);


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);




// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('./db.json');
// const middlewares = jsonServer.defaults();
// const port = process.env.PORT || 3000;

// server.use(cors());
// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({ extended: false }));
// server.use('/', issue);
// server.use('/issues', issue);

// server.use(middlewares);
// server.use(router);
// server.listen(port);
