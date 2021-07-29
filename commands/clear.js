const fs = require('fs')
mods = require('../Modules.js')
module.exports = {
    name: 'clear',
    description: "Pings Latency",
    execute(client, message, args, Discord) {
        if (false) {
            var obj = {
                table: []
            };

            var json = JSON.stringify(obj, null, 4);
            console.log(args);
            for (c = 0; c < 12; c++) {
                names = mods.getMonthString(c)
                fs.writeFile(`Database/StarS/${names}.json`, json, err => {
                    if (err) throw err;
                })
            }
        }
    }
}