'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates a connection to database.
 *
 * 
 * @author: charles onuorah
 * 
 *
 */
require('dotenv').config();

var pool = new _pg2.default.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});
// if(process.env.NODE_ENV ==='DEVELOPMENT'){


// }
// else if(process.env.NODE_ENV === 'TEST'){
//      pool = new pg.Pool({
//         connectionString: process.env.HEROKU_POSTGRESQL_GRAY_URL,
//         ssl: true,
//       });
//  }
// else{
//     pool = new pg.Pool({
//         connectionString: process.env.HEROKU_POSTGRESQL_WHITE_URL , ssl:true
//     }); 
// }
exports.default = pool;