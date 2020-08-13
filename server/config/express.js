const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const secret = 'secret';

module.exports = (app) => {
  
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true,
        exposedHeaders: 'Authorization'
      }));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))

    app.use(cookieParser(secret));
};