'use strict';
let request = require('request');
let creds = require('./credentials');
let options = {
    uri: `https://graph.facebook.com/v2.6/&access_token=${creds.pagetoken}`,
    method: 'GET',
};

let getBasicInfo = function (userid) {
    return new Promise(function (resolve, reject) {
        options.uri = `https://graph.facebook.com/v2.6/${userid}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${creds.pagetoken}`;

        request(options, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(body);
                resolve(body);
            }
            else { resolve(false); }
        });
    });
};

exports.getBasicInfo = getBasicInfo;