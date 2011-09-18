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
    
    var DATE_ISO8601 = '%Y-%m-%dT%H:%i:%s%O';
    var DATE_RFC2822 = '%D, %d %M %y %H:%i:%s %O'
    
    function pad (input, toLength) {
        return Array(Math.ceil(Math.max(0, toLength - ('' + input).length)) + 1).join('0') + input;
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
            return pad(day, 2);
        },
        N: function () {
            return weekDay || 7;
        },
        S: function () {
            // INFO: this works fine for numbers between 0 and 99
            // since dates are between 1 and 31, it's OK to use it
            return ['st', 'nd', 'rd'][day < 11 || day > 13 ? day % 10 - 1 : 3] || 'th';
        },
        w: function () {
            return weekDay;
        },
        z: function () {
            return (timestamp - new Date(year, 0)) / 864e5 | 0;
        },
        W: function () {
            var t = new Date(year, month, day + 4 - (weekDay || 7));
            return pad(1 + Math.floor((t - new Date(t.getFullYear(), 0, 1)) / 6048e5), 2);
        },
        F: function () {
            return months[month];
        },
        m: function () {
            return pad(month + 1, 2);
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
            return pad(year % 100, 2);
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
            return pad(hours, 2);
        },
        i: function () {
            return pad(min, 2);
        },
        s: function () {
            return pad(sec, 2);
        },
        U: function () {
            return timestamp / 1e3 | 0;
        },
        h: function (t) {
            return pad(hours % 12 || 12, 2);
        },
        c: function () {
            return date(DATE_ISO8601, timestamp);
        },
        r: function () {
            return date(DATE_RFC2822, timestamp);
        },
        I: function () {
            return (tz !== new Date(year, 0).getTimezoneOffset()) | 0;
        },
        O: function (a) {
            a = Math.abs(tz);
            return (tz > 0 ? '-' : '+') + pad((a / 60 | 0) * 100 + a % 60, 4);
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

date.DATE_ATOM = date.DATE_RFC3339 = date.DATE_W3C = '%Y-%m-%dT%H:%i:%s%P';
date.DATE_COOKIE = date.DATE_RFC850 = '%l, %d-%M-%y %H:%i:%s %T';
date.DATE_ISO8601 = '%Y-%m-%dT%H:%i:%s%O';
date.DATE_RFC822 = date.DATE_RFC1036 = date.DATE_RFC1123 = date.DATE_RFC2822 = '%D, %d %M %y %H:%i:%s %O';
date.DATE_RSS = '%D, %d %M %Y %H:%i:%s %O';