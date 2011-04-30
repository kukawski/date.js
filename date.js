function date (format, timestamp) {
    if (~~timestamp === timestamp) {
        timestamp = new Date(timestamp);
    } else if (!(timestamp instanceof Date)) {
        timestamp = new Date();
    }
    
    var year = timestamp.getFullYear(),
        month = timestamp.getMonth(),
        day = timestamp.getDate(),
        weekDay = timestamp.getDay(),
        tz = timestamp.getTimezoneOffset(),
        hours = timestamp.getHours(),
        min = timestamp.getMinutes(),
        sec = timestamp.getSeconds();
        
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
        
    var monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
    var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var weekDaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    function pad (input, toLength) {
        input += '';
        toLength = Math.max(0, toLength) || 2;

        var charsRequired = Math.max(0, toLength - input.length);

        return Array(Math.ceil(charsRequired) + 1).join('0') + input;
    }
    
    var helpers = {
        j: function () {
            return day;
        },
        l: function () {
            return weekDays[weekDay];
        },
        D: function () {
            return weekDaysShort[weekDay];
        },
        d: function () {
            return pad(day);
        },
        N: function () {
            return weekDay || 7;
        },
        S: function () {
            // INFO: this works fine for numbers between 0 and 99
            // since dates are between 1 and 31, it's OK to use it
            return ['st','nd','rd'][day < 11 || day > 13 ? day % 10 - 1 : 3] || 'th';
        },
        w: function () {
            return weekDay;
        },
        z: function () {
            return (timestamp - new Date(year, 0)) / 864e5 | 0;
        },
        W: function () {
            var t = new Date(year, month, day + 4 - (weekDay || 7));
            return pad(1 + Math.floor((t - new Date(t.getFullYear(), 0, 1)) / 6048e5));
        },
        F: function () {
            return months[month];
        },
        m: function () {
            return pad(month + 1);
        },
        M: function () {
            return monthsShort[month];
        },
        n: function () {
            return month + 1;
        },
        t: function () {
            return new Date(year, month + 1, 0).getDate();
        },
        L: function () {
            return new Date(year, 1, 29).getMonth() === 1 | 0;
        },
        Y: function () {
            return year;
        },
        y: function () {
            return pad(year % 100);
        },
        a: function () {
            return hours < 12 ? 'am' : 'pm';
        },
        A: function () {
            return hours < 12 ? 'AM' : 'PM';
        },
        g: function () {
            return hours % 12 || 12;
        },
        G: function () {
            return hours;
        },
        H: function () {
            return pad(hours);
        },
        i: function () {
            return pad(min);
        },
        s: function () {
            return pad(sec);
        },
        U: function () {
            return timestamp / 1e3 | 0;
        },
        h: function (t) {
            return pad(hours % 12 || 12);
        },
        c: function () {
            return date('%Y-%m-%dT%H:%i:%s%P', timestamp);
        },
        r: function () {
            return date('%D, %d %M %Y %H:%i:%s %O', timestamp);
        },
        I: function () {
            return (tz !== new Date(year, 0).getTimezoneOffset()) | 0;
        },
        O: function () {
            return (tz > 0 ? '-' : '+') + pad(Math.abs(tz) * 100 / 60 | 0, 4);
        },
        P: function (t) {
            t = date('%O', timestamp);
            return t.slice(0, 3) + ':' + t.slice(3);
        },
        Z: function () {
            return -60 * tz;
        },
        B: function () {
            var t = Math.floor((hours * 3600 + min * 60 + sec + (tz + 60) * 60) / 86.4);
            t += t > 1e3 ? -1e3 : t < 0 ? 1e3 : 0;
            return pad(t, 3);
        },
        o: function () {
            return new Date(year, month, day + 4 - (weekDay || 7)).getFullYear();
        },
        u: function () {
            return pad(timestamp * 1e3, 6);
        }
    }
    return format.replace(/%(.)/g, function ($0, $1) {
        return helpers[$1] ? helpers[$1]() : $0;
    });
}