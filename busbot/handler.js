'use strict';
module.exports.hello = function(event, context, callback) {
    let send = require('./functions');
    let creds = require('./credentials');

    let authToken = 'PvHX6ACWEXMnv5sO5rjYuBUtrRYrntWo';

    if (event.httpMethod === 'GET') {
        if (event.queryStringParameters['hub.verify_token'] === authToken) {
            let response = {
                statusCode: 200,
                headers: {},
                body: event.queryStringParameters['hub.challenge']
            };
            callback(null, response);
        }

        else {
            let response = {
                statusCode: 403,
                body: "Rejected authentication token."
            };
            callback(null, response);
        }
    }

    else if (event.httpMethod === 'POST') {
        let body = JSON.parse(event.body);
        let response = {
            statusCode: 200,
            body: "You're not Facebook! ",
        };
        console.log(event.body);
        let userid = body.entry[0].messaging[0].sender.id;
        send.read(userid).then( function (result) {
            console.log(result);
            callback(null, response);
        });
        send.message(userid, body.entry[0].messaging[0].message.text);
    }

    else {
        let response = {
            statusCode: 400,
            body: "Rejected authentication token."
        };
        callback(null, response);
    }
};