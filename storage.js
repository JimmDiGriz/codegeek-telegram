/**
 * Created by JimmDiGriz on 23.02.2017.
 */

'use strict';

let redis = require('redis');
let client = redis.createClient();

module.exports = client;