'use strict';

module.exports = app => {
    require('./auth.routes.js')(app);
    require('./feed.routes.js')(app);
    require('./user.routes.js')(app);
};