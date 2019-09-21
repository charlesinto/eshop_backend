'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _authRoute = require('./Routes/authRoute');

var _authRoute2 = _interopRequireDefault(_authRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

app.use('/api/v1/auth', _authRoute2.default);
app.get('/', function (req, res) {
  return res.send({ message: 'welcome to endsoup api' });
});
var port = process.env.PORT || 5000;
var server = _http2.default.createServer(app);

server.listen(port, function () {
  console.log('server is listening on port ' + port);
});

exports.default = server;