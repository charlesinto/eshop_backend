"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _Helper = require("../Helper");

var _Helper2 = _interopRequireDefault(_Helper);

var _users = require("../users.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AuthController = function () {
    function AuthController() {
        _classCallCheck(this, AuthController);

        this.signUpUser = this.signUpUser.bind(this);
        this.login = this.login.bind(this);
    }

    _createClass(AuthController, [{
        key: "signUpUser",
        value: function signUpUser(req, res) {
            var _req$body = req.body,
                email = _req$body.email,
                password = _req$body.password,
                fullname = _req$body.fullname;

            if (!email || !password || !fullname) {
                return res.status(404).send({
                    message: 'Bad or incomplete request'
                });
            }
            _users.users.push({ email: email, password: password, fullname: fullname });
            var createdUser = _users.users.find(function (user) {
                return user.email === email;
            });
            return res.status(201).send({
                message: 'User created successfully',
                user: createdUser
            });

            /*
            const sql = `
            CREATE TABLE IF NOT EXISTS BASE_USER (userid SERIAL, fullname varchar(100) NOT NULL, email varchar(100) NOT NULL,
            phonenumber varchar(25), hashpassword varchar(100) NOT NULL, datecreated timestamp NOT NULL
            );
            INSERT INTO BASE_USER(email,hashpassword,fullname,datecreated)
                 VALUES ($1,$2,$3,$4);`;
              const hashpassword = bcrypt.hashSync(password, 10);
              Helper.executeQuery(sql,[email,hashpassword,fullname,'NOW()'])
                .then((result) => {
                    let sql = 'SELECT * FROM BASE_USER where email = $1';
                    Helper.executeQuery(sql,[email])
                    .then((result) => {
                        const {email,hashpassword,fullname,datecreated} = result.rows[0];
                                    
                        return res.status(201).send({
                            message:'User created successfully',
                            user:{email, hashpassword, fullname, datecreated}
                        })
                    })
                    .catch((error) => {
                        console.log('error')
                        return  res.status(400).send({message:error})
                    })
            })
            .catch((error) => {
                console.log('error-2')
                return  res.status(400).send({message:error})
            })
            */
        }
    }, {
        key: "login",
        value: function login(req, res) {
            var _req$body2 = req.body,
                email = _req$body2.email,
                password = _req$body2.password;

            var createdUser = _users.users.find(function (user) {
                return user.email === email && user.password === password;
            });
            return res.status(200).send({
                message: createdUser ? 'operation successful' : 'User not found',
                user: createdUser ? createdUser : {}
            });
        }
    }]);

    return AuthController;
}();

exports.default = new AuthController();