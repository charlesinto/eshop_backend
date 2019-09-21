"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Database = require("./Db/Database");

var _Database2 = _interopRequireDefault(_Database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helper = function () {
    function Helper() {
        _classCallCheck(this, Helper);

        this.executeQuery = this.executeQuery.bind(this);
        this.connectToDb = this.connectToDb.bind(this);
        this.assignToken = this.assignToken.bind(this);
    }

    _createClass(Helper, [{
        key: "trimWhiteSpace",
        value: function trimWhiteSpace(obj) {
            if (typeof obj !== "undefined" && obj !== '' && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && typeof obj.length === "undefined") {

                Object.keys(obj).forEach(function (key) {
                    if (obj[key] !== null && typeof obj[key] !== "number" && !Array.isArray(obj[key])) {
                        obj[key] = obj[key].trim();
                    }
                });
                return obj;
            } else {
                return '';
            }
        }
    }, {
        key: "validateKey",
        value: function validateKey(obj, keys) {
            if (typeof obj === "undefined" && typeof obj.length === "undefined") {
                return false;
            } else {
                var objetctKey = Object.keys(obj);
                var keyMatch = void 0;
                for (var i = 0; i < keys.length; i++) {
                    keyMatch = false;
                    for (var j = 0; j < objetctKey.length; j++) {
                        if (keys[i] === objetctKey[j]) {
                            keyMatch = true;
                        }
                    }
                    if (!keyMatch) {
                        return false;
                    }
                }
                if (keyMatch) {
                    return true;
                }
                return false;
            }
        }
    }, {
        key: "validateInput",
        value: function validateInput(res, obj) {
            if (typeof obj !== "undefined" && obj !== '' && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && typeof obj.length === "undefined") {

                var keys = Object.keys(obj);
                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] === 'firstname' || keys[i] === 'lastname') {
                        if (_typeof(obj[keys[i]]) === undefined || obj[keys[i]] === '' || /[@!#$%^&*()\d~`<>?":{}+=?/]/i.test(obj[keys[i]])) {
                            res.statusCode = 400;
                            res.setHeader('content-type', 'application/json');
                            res.json({ message: keys[i] + "  required and no special character allowed" });
                            return false;
                        }
                    }
                    if (keys[i] === 'phonenumber') {
                        if (typeof obj[keys[i]] === "undefined" || obj[keys[i]] === '' || !Validator.isNumeric(obj[keys[i]]) || obj[keys[i]].length < 11) {
                            res.statusCode = 400;
                            res.setHeader('content-type', 'application/json');
                            res.json({ message: keys[i] + "  required and must be numbers of 11 digits" });
                            return false;
                        }
                    }
                    if (keys[i] === 'email') {

                        if (!Validator.isEmail(obj[keys[i]])) {
                            res.statusCode = 400;
                            res.setHeader('content-type', 'application/json');
                            res.json({ message: keys[i] + "  required and must be in valid format" });
                            return false;
                        }
                    } else if (typeof obj[keys[i]] === "undefined" || obj[keys[i]] === '') {
                        res.statusCode = 400;
                        res.setHeader('content-type', 'application/json');
                        res.json({ message: keys[i] + " required" });
                        return false;
                    }
                }
                return true;
            } else {
                return false;
            }
        }

        /**
        * Initiates connection a database.
        * @author: charles
        */

    }, {
        key: "connectToDb",
        value: function connectToDb() {
            return new Promise(function (resolve, reject) {
                _Database2.default.connect(function (err, client, done) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(client, done);
                    }
                });
            });
        }
        /**
         * Executes a query againt postgress database
         *
         *
         * @author: charles
         * @param {sql, params} r takes in the sql statement and the parameters to be passed in.
         */

    }, {
        key: "executeQuery",
        value: function executeQuery(sql, params) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.connectToDb().then(function (client, done) {
                    if (typeof params !== "undefined" && params.length > 0) {
                        client.query(sql, params, function (err, result) {
                            client.release();
                            if (err) {
                                console.log('eorr', err);
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } else {
                        client.query(sql, function (err, result) {
                            client.release();
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    }
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
        /**
        * Assign token to user
        *
        * 
        * @author: chalres
        * @param {payload}  The user details.
        */

    }, {
        key: "assignToken",
        value: function assignToken(payload) {
            var key = process.env.SECRET_KEY || 'brillianceisevenlydistributed';
            return new Promise(function (resolve, reject) {
                jwt.sign(payload, key, { expiresIn: '7 days' }, function (err, token) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                });
            });
        }
    }]);

    return Helper;
}();

exports.default = new Helper();