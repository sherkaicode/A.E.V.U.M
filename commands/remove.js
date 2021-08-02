const fs = require('fs')
mods = require('../Modules.js')
module.exports = {
    name: 'remove',
    description: "Pings Latency",
    execute(client, message, args, Discord) {
        var filePC;
        var run = true;
        var month = mods.getMonthString(args[0] - 1)
        var day = args[1]
        var cottage = args[2].toLowerCase()
        message.channel.send(`removing ${month} ${day} to ${cottage} cottage`)
        try {
            if (cottage == 'small') {
                filePC = 'StarS';
            }
            else if (cottage == 'big') {
                filePC = 'StarB';
            }
            else {
                message.channel.send('Input a proper Cottage')
                run = false
            }
        }
        catch {
            run = false
        }

        if (run) {
            fs.readFile(`Database/${filePC}/${month}.json`, 'utf8', async function readFileCallback(err, data) {
                if (err) {
                    console.log(err);
                } else {
                    obj = JSON.parse(data); //now it an object
                    for(c = 0; c<obj.table.length;c++) {
                        if(day == obj.table[c]){
                            obj.table.splice(c,1)
                        }
                    }

                    var json = JSON.stringify(obj, null, 4);
                    fs.writeFile(`Database/${filePC}/${month}.json`, json, err => {
                        if (err) throw err;
                    })
                    message.channel.send('removed succesfully')

                }
            });
        }

    }
}