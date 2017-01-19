'use strict';
module.exports.hello = function(event, context, finishedcallback) {
    let send = require('./sendFunctions');
    let user = require('./userFunctions');
    let async = require('async');

    let authToken = 'PvHX6ACWEXMnv5sO5rjYuBUtrRYrntWo';

    if (event.httpMethod === 'GET') {
        if (event.queryStringParameters['hub.verify_token'] === authToken) {
            let response = {
                statusCode: 200,
                headers: {},
                body: event.queryStringParameters['hub.challenge']
            };
            finishedcallback(null, response);
        }

        else {
            let response = {
                statusCode: 403,
                body: "Rejected authentication token."
            };
            finishedcallback(null, response);
        }
    }

    else if (event.httpMethod === 'POST') {
        let body = JSON.parse(event.body);
        let response = {
            statusCode: 200,
            body: "You're not Facebook! ",
        };
        console.log(event.body);
        let userDetails = {};
        userDetails.id = body.entry[0].messaging[0].sender.id;

        async.parallel([
                function(callback) {
                    send.read(userDetails.id).then( function (result) {
                        console.log(result);
                        callback(null, response);
                    });
                },
                function(callback) {
                    user.getBasicInfo(userDetails.id).then( function (result) {
                        result = JSON.parse(result);
                        userDetails.firstName = result.first_name;
                        userDetails.lastName = result.last_name;
                        userDetails.profilePic = result.profile_pic;
                        userDetails.locale = result.locale;
                        userDetails.timezone = result.timezone;
                        userDetails.gender = result.gender;
                        callback(null, response);
                    });
                }
            ],
            function(err, results) {
            if (!err) {
                let message = `${userDetails.firstName}, you sent me this: ${body.entry[0].messaging[0].message.text}`;
                send.message(userDetails.id, message).then( function (result) {
                    console.log(result);
                    finishedcallback(null, response);
                });
            }
        });
    }

    else {
        let response = {
            statusCode: 400,
            body: "Rejected authentication token."
        };
        finishedcallback(null, response);
    }
};