'use strict';
let request = require('request');
let creds = require('./credentials');
let options = {
    uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + creds.pagetoken,
    method: 'POST',
    json: {
        "recipient":{
            "id": '',
        },
        "sender_action":"mark_seen"
    }
};

let read = function (userid) {
    return new Promise(function (resolve, reject) {
        let options = {
            uri: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + creds.pagetoken,
            method: 'POST',
            json: {
                "recipient":{
                    "id": userid,
                },
                "sender_action":"mark_seen"
            }
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                resolve(true);
            }
            else { resolve(false); }
        });
    });
};

let message = function (userid, message) {
    return new Promise(function (resolve, reject) {
        options.json.recipient.id = userid;
        options.json = {
            "recipient": {
                "id": userid
            },
            "message": {
                "text": message
            }
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                resolve(true);
            }
            else { resolve(false); }
        });
    });
};

exports.read = read;
exports.message = message;