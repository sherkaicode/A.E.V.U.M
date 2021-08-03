
const fs = require("fs");
const Canvas = require("canvas");
var mods = require("../Modules.js")
module.exports = {
    name: 'gen',
    description: "Pings Latency",
    async execute(client, message, args, Discord) {
        var bol;
        var picname;
        var create
        mes = args[0]
        //console.log(mes);
        try {
            if (mes.toLowerCase() == 'big') {
                bol = true
                picname = 'big'
                create = true
            }
            else if (mes.toLowerCase() == 'small') {
                bol = false
                picname = 'small'
                create = true
            }
            else {
                message.channel.send('Input a valid Cottage')
                create = false
            }
        }
        catch {
            create = false
            console.log(create)
            message.channel.send('Input a valid Cottage')
        }

        if (create) {
            createCalendar(bol, picname)
        }
        async function createCalendar(Cottage, picname) {
            //1430
            //1368
            const today = new Date();
            var month = `${today.getMonth()}`;
            var monthstr = mods.getMonthString(today.getMonth());
            var week = today.getDay();
            
            var tod = today.getDate();

            
            var weeknum1 = Math.abs((week - (tod -1)) % 7);
            const space = 50;
            const WIDTH = 1150;
            const HEIGHT = 1000;
            var posx = space;
            var posy = 215;
            const gridwidth = (WIDTH - 100) / 7;
            const gridHeight = ((HEIGHT - 200) - 315) / 5;
            var test = true;
            const daysInMonth = mods.daysInMonth(today.getFullYear(), today.getMonth() + 1)
            var title;
            var price;
            var add;
            var show;
            if (Cottage) {
                title = 'Bitoon Floating Cottage (BIG~50 pax)';
                price = 'P2,500.00 only | Original price';
                add = 90
                show = true
                var Star = JSON.parse(fs.readFileSync(`Database/StarB/${monthstr}.json`))
            }
            else {
                title = 'Bitton Floating Cottage (SMALL~25 pax)';
                price = 'P1,500 only';
                add = 0
                show = false
                var Star = JSON.parse(fs.readFileSync(`Database/StarS/${monthstr}.json`))
            }
            Canvas.registerFont('Fonts/ABR.ttf', { family: 'Abril' })
            Canvas.registerFont('Fonts/ANT.ttf', { family: 'Anton' })
            Canvas.registerFont('Fonts/ULT.ttf', { family: 'Ultra' })
            Canvas.registerFont('Fonts/Q.ttf', { family: 'QQ' })
            Canvas.registerFont('Fonts/Z.ttf', { family: 'ZZ' })
            Canvas.registerFont('Fonts/L.ttf', { family: 'LL' })

            const canvas = Canvas.createCanvas(WIDTH, HEIGHT - 90 + add);
            const ctx = canvas.getContext("2d");
            
            var Week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
            var Ban = JSON.parse(fs.readFileSync(`Database/Ban/${monthstr}.json`))

            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, WIDTH, HEIGHT);

            for (c = 0; c < 6; c++) {
                mods.drawlineH(ctx, posy, space, WIDTH - space)
                posy += ((HEIGHT - 200) - 315) / 5;
            }
            mods.drawText(ctx, "QQ", '#000000', 55, title, mods.getPos(canvas, title, 55, WIDTH, 'QQ'), mods.getY(canvas, 55) + 10)

            mods.drawText(ctx, "Ultra", '#24519d', 100, monthstr, mods.getPos(canvas, monthstr, 100, WIDTH, 'Ultra'), mods.getY(canvas, 55) + mods.getY(canvas, 100) + 20)

            mods.drawRect(ctx, space, 180, canvas.width - (2 * space), 215 - 180, '#0066ff');
            for (c = 0; c < Week.length; c++) {
                mods.drawText(ctx, "Abril", 'White', 35, Week[c], space + c * gridwidth + mods.getPos(canvas, Week[c], 35, gridwidth), 210)
            }
            //Put numbers
            var ymul = 0
            var count = 1
            
            for (c = weeknum1; c < 8; c++) {
                var bol = true
                if (count == daysInMonth+1) {
                    break
                }
                if (c % 7 == 0&& !(c ==0)) {
                    ymul++;
                    c = 0
                }

                mods.drawText(ctx, "Abril", 'black', 60, `${count}`, space + c * gridwidth + mods.getPos(canvas, `${count}`, 60, gridwidth), 260 + ymul * gridHeight + (gridHeight - mods.getY(canvas, 70)) / 2)
                for (f = 0; f < Ban.table.length; f++) {
                    if (Ban.table[f] == count) {
                        await mods.getImage(canvas, 'X', space + 10 + c * gridwidth + (gridwidth - gridHeight - 5) / 2, 215 + 5 + ymul * gridHeight + (gridHeight - gridHeight - 5) / 2, gridHeight - 10, gridHeight - 10)
                        bol = false
                    }
                }
                if (bol) {
                    test=true
                    for (g = 0; g < Star.table.length; g++) {
                        if (Star.table[g] == count) {
                            console.log('SW')
                            test = false
                            await mods.getImage(canvas, 'Star', space + 10 + c * gridwidth + (gridwidth - gridHeight - 5) / 2, 215 + 5 + ymul * gridHeight + (gridHeight - gridHeight - 5) / 2, gridHeight - 10, gridHeight - 10)
                        }
                    }
                    console.log(test)
                    if ((count >= tod && (0 < c % 7 && c % 7 < 6) && show) && test) {
                        await mods.getImage(canvas, 'Red_R', space + 55 + c * gridwidth + (gridwidth - 70) / 2, 215 + 35 + ymul * gridHeight + (gridHeight - 70) / 2)
                        test = true;
                    }
                    if (count < tod) {
                        await mods.getImage(canvas, 'Star', space + 10 + c * gridwidth + (gridwidth - gridHeight - 5) / 2, 215 + 5 + ymul * gridHeight + (gridHeight - gridHeight - 5) / 2, gridHeight - 10, gridHeight - 10)
                    }
                }
                count++;
            }
            mods.drawText(ctx, "LL", 'black', 55, 'Booked/Unavailable Dates', 110, 854 - 90 + add)

            mods.drawText(ctx, "Anton", 'green', 55, price, mods.getPos(canvas, price, 55, WIDTH, 'Anton'), HEIGHT - 50 - 90 + add)

            if (show) {
                await mods.getImage(canvas, 'Red', 40, 710)
                mods.drawText(ctx, "Abril", '#000000', 55, 'Promo ( ', 110, 764)
                mods.drawText(ctx, "Abril", 'red', 55, ' 20%  ', 305, 764)
                mods.drawText(ctx, "Abril", 'black', 55, ' OFF)', 420, 764)
            }
            await mods.getImage(canvas, 'Star', 40, 710 + add)
            //Grid
            for (c = 0; c < 8; c++) {
                mods.drawlineV(ctx, posx, 180, 700)
                posx += (WIDTH - 100) / 7;
            }

            const buffer = canvas.toBuffer("image/png");
            await fs.writeFileSync(`${picname}.png`, buffer);
            const attachment = new Discord.MessageAttachment(buffer, 'welcome-image.png')
            message.channel.send(attachment)
            // ctx.fillStyle = "#000000";
            // ctx.font = "32px Arial";
            // ctx.fillText("Hello", 13, 35);



        }

    }
}