const fs = require('fs')
const FB = require('fb');
mods = require('../Modules.js')
module.exports = {
    name: 'delete',
    description: "Pings Latency",
    execute(client, message, args, Discord) {
        const ACCESS_TOKEN = process.env.FBTOKEN;
        var Cottage = args[0]

        fs.readFile(`Database/Post/${Cottage}.json`, 'utf8', async function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                obj = JSON.parse(data); //now it an object
                FB.setAccessToken(ACCESS_TOKEN);
                try {
                    var postId = obj.table[obj.table.length - 1];


                    FB.api(postId, 'delete', function (res) {
                        if (!res || res.error) {
                            console.log(!res ? 'error occurred' : res.error);
                            return;
                        }
                        console.log('Post was deleted');
                    });
                }
                catch (err) {

                }
                obj.table.pop()

                var json = JSON.stringify(obj, null, 4);
                fs.writeFile(`Database/Post/${Cottage}.json`, json, err => {
                    if (err) throw err;
                })
                message.channel.send('deleted succesfully')

            }
        });
    }
}