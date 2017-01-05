'use strict';

module.exports.hello = function(event, context, callback) {
    let authToken = 'PvHX6ACWEXMnv5sO5rjYuBUtrRYrntWo';

    if (event['httpMethod'] == 'GET') {
        if (event['queryStringParameters']['hub.verify_token'] == authToken) {
            console.log("Error:");
            console.log(event);
            let response = {
                statusCode: 200,
                headers: {
                    //"x-custom-header" : "My Header Value"
                },
                body: event['queryStringParameters']['hub.challenge']
            };
            callback(null, response);
        }

        else {
            let response = {
                statusCode: 403,
                headers: {
                    //"x-custom-header" : "My Header Value"
                },
                body: "Rejected authentication token."
            };
            callback(null, response);
        }
    }

    if (event['httpMethod'] == 'POST') {
            let response = {
                statusCode: 200,
                headers: {
                    //"x-custom-header" : "My Header Value"
                },
            };
            console.log(event['queryStringParameters']);
            callback(null, response);
    }

    else {
        let response = {
            statusCode: 400,
            headers: {
                //"x-custom-header" : "My Header Value"
            },
            body: "Rejected authentication token."
        };
        callback(null, response);
    }
};