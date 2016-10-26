/**
 * Created by renminghe on 16-9-18.
 */
'use strict';
let express = require('express');
let Router = express.Router();
    Router.get('/home/:sort',require('./home'));
    Router.get('/content/:sort',require('./content'));
    Router.get('/promotions/:sort',require('./promotions'));
    Router.all('/business/:sort',require('./business'));
    Router.post('/content/:sort',require('./content'));
module.exports = Router;