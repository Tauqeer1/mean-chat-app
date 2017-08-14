const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./server/config/config');


const app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

require('./server/services/socket')(io);

const chatRoutes = require('./server/api/chat');


mongoose.connect(config.mongoURL);
mongoose.connection.on('error', (err) => {
  console.error(`Mongodb connection error ${err}`);
  process.exit(-1);
});


// Morgan logger
app.use(morgan('dev'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Point static path to public
app.use(express.static(path.join(__dirname, 'public')));


// Set our api routes
app.use('/api/chats', chatRoutes);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.redirect('/');
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';

app.set('port', port);


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
