const fs = require('fs')
const FB = require('fb');
var mods = require("../Modules.js")
require('dotenv').config();
module.exports = {
    name: 'post',
    description: "Pings Latency",
    async execute(client, message, args, Discord) {
        var today = new Date();
        const daysInMonth = mods.daysInMonth(today.getFullYear(), today.getMonth() + 1)
        var week = today.getDay(); 
        var tod = today.getDate();
        var weeknum1 = -1 * ((week - (tod -1)) % 7);
        var dates;
        var weekends = mods.getweekend(daysInMonth, weeknum1, tod)
        if(weekends.length > 2) {
            dates = `${weekends.length}`
        }
        else {
            for(c = 0; c<weekends.length; c++) {
                dates = dates + `${weekends[c]}`
            }
        }
        const ACCESS_TOKEN = process.env.FBTOKEN;
        var run = true;
        var nam = args[0];
        var captionsmall = `Ka-Bitoon❗️ ${dates} Weekend slot are still available
        \n❗️ Book Na ❗️ 
        \n🟡To secure your desired date, be sure to book early and pay at least the minimum downpayment (500 pesos). The first client to pay the downpayment keeps the date. 
        \nSmall Floating Cottage Pics 
        \n👉https://photos.app.goo.gl/ZDqvAd9nZnMVgD6Q7
        \nFor reservations, you may call/text:0997 873 3341 
        \nSee you soon mga Ka-Bitoon ✨`
        var captionbig = `Ka-Bitoon❗️ ${dates} Weekend slot are still available
        \n❗️ Book Na ❗️ 
        \n🟡To secure your desired date, be sure to book early and pay at least the minimum downpayment (1000 pesos). The first client to pay the downpayment keeps the date. 
        \nBig Floating Cottage Pics 
        \n👉https://photos.app.goo.gl/cbNqhKKj4pgKAwcq5
        \nFor reservations, you may call/text:0997 873 3341 
        \nSee you soon mga Ka-Bitoon ✨`
        var captio
        try {
            if (nam == 'big') {
                captio = captionbig
            }
            else if (nam == 'small') {
                captio = captionsmall
            }
            else {
                run = false
            }
        }
        catch {
            run = false
        }
  
        if (run) {
            FB.setAccessToken(ACCESS_TOKEN);
            FB.api('AegisCodez/photos', 'post', { source: fs.createReadStream(`${nam}.png`), caption: captio }, function (res) {
                if (!res || res.error) {
                    console.log(!res ? 'error occurred' : res.error);
                    return;
                }
                console.log('Post Id: ' + res.post_id);
                fs.readFile(`Database/Post/${nam}.json`, 'utf8', async function readFileCallback(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        obj = JSON.parse(data); //now it an object
                        obj.table.push(res.post_id)
                       
                        var json = JSON.stringify(obj, null, 4);
                        fs.writeFile(`Database/Post/${nam}.json`, json, err => {
                            if (err) throw err;
                        })
                    }
                });
                message.channel.send('Posted Successfully')
            });
        }

    }
}