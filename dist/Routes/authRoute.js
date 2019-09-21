'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _AuthController = require('../Controller/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/login', _AuthController2.default.login);
router.post('/signup', _AuthController2.default.signUpUser);

exports.default = router;