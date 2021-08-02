const Canvas = require('canvas');

module.exports = {
    drawlineV: function (ctx, x, y1, y2) {
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.stroke();
    },
    drawlineH: function (ctx, y, x1, x2) {
        ctx.fillStyle = "#000000";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();
    },
    drawText: function (ctx, font, color, size, word, x, y) {
        ctx.fillStyle = color;
        ctx.font = `${size}px ${font}`;
        ctx.fillText(word, x, y);
    },
    drawRect: function (ctx, x1, y1, width, height, color) {
        ctx.fillStyle = color;
        ctx.rect(x1, y1, width, height);
        ctx.fill();
        ctx.fillStyle = 'black'
        ctx.rect(x1, y1, width, height);
        ctx.stroke();
    },
    getMonthString: function (month) {
        switch (month) {
            case 0:
                return 'January'
                break
            case 1:
                return 'February'
                break
            case 2:
                return 'March'
                break
            case 3:
                return 'April'
                break
            case 4:
                return 'May'
                break
            case 5:
                return 'June'
                break
            case 6:
                return 'July'
                break
            case 7:
                return 'August'
                break
            case 8:
                return 'September'
                break
            case 9:
                return 'October'
                break
            case 10:
                return 'November'
                break
            case 11:
                return 'December'
                break
            default:
                return 'NAN'
        }
    },
    getPos: function (canvas, text, size, max = canvas.width, f = 'Arial') {
        const ctx = canvas.getContext('2d');
        ctx.font = `${size}px ${f}`;
        return (max - ctx.measureText(text).width) / 2
    },
    getY: function (canvas, size) {
        const ctx = canvas.getContext('2d');
        ctx.font = `${size}px Arial`;
        return ctx.measureText('M').width
    },
    getImage: async function (canvas, file, x = 0, y = 0, x1 = 70, x2 = 70) {
        img = await Canvas.loadImage(`./images/${file}.png`);
        const ctx = canvas.getContext('2d')
        console.log(img)
        ctx.drawImage(img, x, y, x1, x2)
    },
    daysInMonth: function (month, year) { // Use 1 for January, 2 for February, etc.
        return new Date(year, month, 0).getDate();
    },
    getweekend: function (daysInMonth, weeknum, tod, count = 1) {
        var dates = [];
        for (c = weeknum; c < 8; c++) {
            if (count == daysInMonth + 1) {
                break
            }
            if (count > tod && (c % 7 == 0)) {
                if (count - 1 > tod) {
                    dates.push(count - 1)
                }
                dates.push(count)
                c = 0
            }
            count++
        }
        if (dates.length > 2) {
            return dates
        }
        else {
            return dates
        }

    }
}