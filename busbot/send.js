'use strict';

module.exports.send = function(event, context, callback) {
    let send = require('./functions');

    if (event.httpMethod === 'GET') {
        let body = JSON.parse(event.body);
        let response = {
            statusCode: 200,
            body: "Invalid request. Nice try :P",
        };

        let userid = event.queryStringParameters['id'];
        console.log(userid);
        send.read(userid).then( function (result) {
            console.log(result);
            callback(null, response);
        });
        //send.message(userid, body.entry[0].messaging[0].message.text);
        callback(null, response);
    }

    else {
        let response = {
            statusCode: 400,
            body: "Invalid request. Nice try :P"
        };
        callback(null, response);
    }
};