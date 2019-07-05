'use strict';

const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config/config.js');


app.use(express.static('public'));

app.use(
    bodyParser.urlencoded({
        limit: '200mb',
        parameterLimit: 1000000,
        extended: true
    })
);

app.use(
    bodyParser.json({
        limit: '200mb',
    })
);

app.use(cors());
app.set('port', process.env.PORT || 5000);
app.use(express.static('public'));

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [
            config.COOKIE_SECRET
        ]
    })
);

app.listen(app.get('port'), err => {
    if (err) {
        console.log('Failed to start the server.');
        console.log(err);
    } else {
        console.log(`Server running on port ${app.get('port')}`);

        // db service test
        require('./services/db.service.js')
            .getUsers()
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
});
