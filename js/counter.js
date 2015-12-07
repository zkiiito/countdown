function Counter(el) {
    this.el = el;
    this.intervalDiff = 210;
    var that = this,
        targetDate = null,
        interval = null,
        days = null,
        diff = 0,
        diffCount = 0;

    this.setDate = function(date) {
        targetDate = new Date(date).getTime();
        clearInterval(interval);
        diffCount = 0;
        interval = setInterval(that.render, that.intervalDiff);
    };

    this.render = function() {
        if (diffCount <= 0) {
            diffCount = 100;
            diff = Math.max((targetDate - new Date().getTime()) / 1000, 0);
            if (diff === 0) {
                clearInterval(interval);
            }
        } else {
            diffCount--;
            diff -= that.intervalDiff/1000;
        }

        var millis = (diff % 1).toString().substr(2,3),
            secs = Math.floor(diff % 60),
            diffMins = Math.floor(diff / 60),
            mins = diffMins % 60,
            diffHours = Math.floor(diffMins / 60),
            hours = diffHours % 24,
            daysNow = Math.floor(diffHours / 24);

        while (millis.length < 3) {
            millis += '0';
        }

        if (secs < 10) {
            secs = '0' + secs;
        }

        if (mins < 10) {
            mins = '0' + mins;
        }

        if (hours < 10) {
            hours = '0' + hours;
        }

        if (days !== daysNow) {
            $('#days').text(daysNow);
            days = daysNow;
        }

        $('span#time').text(hours + ':' + mins + ':' + secs + '.' + millis);

        that.el.show();
    };

    this.setPos = function(x,y) {
        setPosX(x);
        setPosY(y);
    };

    var setPosY = function(y) {
        switch (y) {
            case 'T':
                that.el.css('bottom', '');
                that.el.css('top', 0);
                break;
            case 'B':
                that.el.css('top', '');
                that.el.css('bottom', 0);
                break;
            case 'C':
                that.el.css('bottom', '');
                that.el.css('top', ($(document).height() - that.el.height())/2 + 'px');
                break;
            default:
                that.el.css('top', y + '%');
                that.el.css('bottom', '');
        }

        that.el.data('ypos', y);
    };

    var setPosX = function(x) {
        switch (x) {
            case 'L':
                that.el.css('right', '');
                that.el.css('left', 0);
                break;
            case 'R':
                that.el.css('right', 0);
                that.el.css('left', '');
                break;
            case 'C':
                that.el.css('right', '');
                that.el.css('left', ($(document).width() - that.el.width())/2 + 'px');
                break;
            default:
                that.el.css('left', x + '%');
                that.el.css('right', '');
        }

        that.el.data('xpos', x);
    };
}

var counter = new Counter($('#counter'));