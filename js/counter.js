function Counter(el) {
	this.el = el;
	this.intervalDiff = 210;
	var that = this,
	    targetDate = null,
	    interval = null,
            secs = null,
            mins = null,
            hours = null,
            days = null;

            diff = 0,
            diffCount = 0;
	
	this.init = function() {
	};
	
	this.setDate = function(date) {
		that.targetDate = new Date(date).getTime();
		clearInterval(that.interval);
		that.diffCount = 0;
		that.interval = setInterval(that.render, that.intervalDiff);
	};
	
	this.render = function() {
		if (that.diffCount <= 0) {
			that.diffCount = 100;
			var d = that.diff;
			that.diff = Math.max((that.targetDate - new Date().getTime()) / 1000, 0);
			//console.log('error: ' + (d - that.diff));
                        if (that.diff === 0) {
                            clearInterval(that.interval);
                        }
		} else {
			that.diffCount--;
			that.diff -= that.intervalDiff/1000;
		}
	
		var diff = that.diff;
		var millis = (diff % 1).toString().substr(2,3),
			secs = Math.floor(diff % 60),
			diffMins = Math.floor(diff / 60),
			mins = diffMins % 60,
			diffHours = Math.floor(diffMins / 60),
			hours = diffHours % 24,
			days = Math.floor(diffHours / 24);
                        
                while (millis.length < 3) {
                    millis += '0';
                }
			
		if (secs < 10)
			secs = '0' + secs;
			
		if (mins < 10)
			mins = '0' + mins;
			
		if (hours < 10)
			hours = '0' + hours;
			
		$('#millis').text(millis);
		
		if (that.secs != secs) {
			$('#secs').text(secs);
			that.secs = secs;
		}
			
		if (that.mins != mins) {
			$('#mins').text(mins);
			that.mins = mins;
		}
		
		if (that.hours != hours) {
			$('#hours').text(hours);
			that.hours = hours;
		}
			
		if (that.days != days) {
			$('#days').text(days);
			that.days = days;
		}
	};
	
	this.initDrag = function() {
		that.el.draggable({
			containment: $('body'),
			scroll: false,
                        start: function(event, ui) {
                            $('#counterpos').val('custom');
                        },
			stop: function(event, ui) {
				ui.helper.data('xpos', ui.position.left / $(document).width() * 100);
				ui.helper.data('ypos', ui.position.top / $(document).height() * 100);
				fixPos();
			}
		});
	};
	
	this.setPos = function(x,y) {
		setPosX(x);
		setPosY(y);
	};
	
	var fixPos = function() {
		setPosY(that.el.data('ypos'));
		setPosX(that.el.data('xpos'));
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
counter.init();