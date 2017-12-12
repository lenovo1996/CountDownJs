/**
 * Created by LePhi on 12/11/2017.
 * How to use:
 * CountDownJs cần Jquery để hoạt động
 * những options cần thiết để CountDownJs có thể chạy:
 * var options = {
 *      element: $('#countDownJs'), // element định sẵn để countDownJs tác động đến
 *      from: Date.now(), // ngày bắt đầu, định dạng timestamp, hãy chắc chắn from date không lớn hơn to date
 *      to: new Date('01/01/2018').getTime() // ngày kết thúc, định dạng timestamp, hãy chắc chắn from date không lớn hơn to date
 * };
 *
 * nếu muốn hide Year, Day, Hour, Minute, Second, Milisecond,
 * thêm các options dưới đây:
 *
 * options.year = false;
 * options.day = false;
 * options.hour = false;
 * options.minute = false;
 * options.second = false;
 * options.milisecond = false;
 *
 * nếu muốn thực thi một function sau khi stop countdown,
 * hãy thêm option:
 *
 * options.stop = function () {
 *      # code here
 *      alert('Stop countdown');
 * }
 *
 * Sau khi khai báo options, hãy call CountDownJs để bắt đầu:
 *
 * new countDownJs(options).start();
 *
 * Hãy contribute để CountDownJs hoạt động tốt hơn
 *
 * Cám ơn vì đã sử dụng CountDownJs!
 */

var countDownJs = function (options) {
    var self = this;
    var callback;
    // khai báo các options default
    var defaultOptions = {
        template: 'column',
        year: true,
        day: true,
        hour: true,
        minute: true,
        second: true,
        milisecond: true
    };

    this.start = function () {
        callback = options.stop || function () {
            };

        if (!options) {
            options = defaultOptions;
        }
        if (options.from === undefined) {
            options.from = Date.now();
        }
        if (options.to === undefined) {
            console.error('không tồn tại ngày kết thúc');
            return false;
        }
        if (options.template === undefined) {
            options.template = 'column';
        }
        if (options.from >= options.to) {
            console.error('ngày bắt đầu không được lớn hơn hoặc bằng ngày kết thúc');
            return false;
        }
        if (options.element > 0) {
            console.error('không tồn tại element xác định');
            return false;
        }
        if (options.year === undefined) {
            options.day = defaultOptions.day;
        }
        if (options.day === undefined) {
            options.day = defaultOptions.day;
        }
        if (options.hour === undefined) {
            options.hour = defaultOptions.hour;
        }
        if (options.minute === undefined) {
            options.minute = defaultOptions.minute;
        }
        if (options.second === undefined) {
            options.second = defaultOptions.second;
        }
        if (options.milisecond === undefined) {
            options.milisecond = defaultOptions.milisecond;
        }
        // bắt đầu tính ngày bắt đầu đến ngày kết thúc
        this.caculate();
        return true;
    };

    this.caculate = function () {
        var timer = 10; // time for one loop inerval
        var intv = setInterval(function () {
            var diffTimestamp = (options.to / 1000) - (options.from / 1000);
            var years = self.component(diffTimestamp, 365 * 24 * 60 * 60) % 365, // years
                days = self.component(diffTimestamp, 24 * 60 * 60) % 365,      // days
                hours = self.pad(self.component(diffTimestamp, 60 * 60) % 24, 2), // hours
                minutes = self.pad(self.component(diffTimestamp, 60) % 60, 2), // minutes
                seconds = self.pad(self.component(diffTimestamp, 1) % 60, 2), // seconds
                miliseconds = self.pad(self.component(diffTimestamp, 1 / 1000) % 1000, 1); // miliseconds
            self.insertToHtml(years, days, hours, minutes, seconds, miliseconds);
            options.to = options.to - 10; // miliseconds
            if (diffTimestamp <= 0) {
                callback();
                clearInterval(intv);
            }
        }, timer);
    };

    this.insertToHtml = function (years, days, hours, minutes, seconds, miliseconds) {
        if ($('.countDownJs').length) {
            $('.timer-years').text(years);
            $('.timer-days').text(days);
            $('.timer-hours').text(hours);
            $('.timer-minutes').text(minutes);
            $('.timer-seconds').text(seconds);
            $('.timer-miliseconds').text(miliseconds);
        } else {
            var html = [];
            if (options.day) {
                html.push('<div class="timer-column">');
                html.push('<div class="timer-years"></div>');
                html.push('<div class="timer-name">years</div>');
                html.push('</div>');
            }
            if (options.day) {
                html.push('<div class="timer-column">');
                html.push('<div class="timer-days"></div>');
                html.push('<div class="timer-name">days</div>');
                html.push('</div>');
            }
            if (options.hour) {
                html.push('<div class="timer-column">');
                html.push('<div class="timer-hours"></div>');
                html.push('<div class="timer-name">hrs</div>');
                html.push('</div>');
            }
            if (options.minute) {
                html.push('<div class="timer-column">');
                html.push('<div class="timer-minutes"></div>');
                html.push('<div class="timer-name">min</div>');
                html.push('</div>');
            }
            if (options.second) {
                html.push('<div class="timer-column">');
                html.push('<div class="timer-seconds"></div>');
                html.push('<div class="timer-name">sec</div>');
                html.push('</div>');
            }
            if (options.milisecond) {
                html.push('<div class="timer-column">');
                html.push('<div class="timer-miliseconds"></div>');
                html.push('<div class="timer-name">msec</div>');
                html.push('</div>');
            }
            options.element.addClass('countDownJs ' + options.template).html(html.join(''));
        }
        return true;
    }
};

countDownJs.prototype = {
    constructor: countDownJs,
    pad: function (num, size) {
        var s = num + "";
        while (s.length < size) s = "0" + s;
        return s;
    },

    component: function (x, v) {
        return Math.floor(x / v);
    }
};
