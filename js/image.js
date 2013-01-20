function Image(el) {
	this.el = el;
	var that = this;
	
	this.setPos = function(pos) {
		var css = '';

		switch (pos[1]) {
			case 'L':
				css = 'left';
				break;
			case 'R':
				css = 'right';
				break;
			case 'C':
				css = 'center';
				break;
		}
		
		css += ' ';

		switch (pos[0]) {
			case 'T':
				css += 'top'; 
				break;
			case 'B':
				css += 'bottom';
				break;
			case 'C':
				css += 'center';
		}
		
		that.el.data('pos', pos);
		that.el.css('background-position', css);
	}
	
	this.setSize = function(size) {
		that.el.css('background-size', size);
	}
	
	this.setImage = function(data) {
		that.el.css('background-image', 'url(' +data + ')');
	}
}

var image = new Image($('#img'));