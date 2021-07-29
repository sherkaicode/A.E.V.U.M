const fs = require('fs')
const FB = require('fb');
require('dotenv').config();
module.exports = {
    name: 'post',
    description: "Pings Latency",
    async execute(client, message, args, Discord) {
        var nam = args[0];
        console.log('SS')
        const ACCESS_TOKEN = process.env.FBTOKEN;
        FB.setAccessToken(ACCESS_TOKEN);
        FB.api('AegisCodez/photos', 'post', { source: fs.createReadStream(`${nam}.png`), caption: 'Swag' }, function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }
            console.log('Post Id: ' + res.post_id);
        });

    }
}