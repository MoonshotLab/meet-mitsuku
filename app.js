require('dotenv').config();

const express = require('express');
const app = express();
const http = require('http').Server(app);

const bodyParser = require('body-parser');
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log('Server running on port ' + port);
});

app.use('/', require('./routes/index'));
app.use('/chat', require('./routes/chat'));
app.use('*', (req, res) => {
  res.redirect('/');
});

module.exports = app;
