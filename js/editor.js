var Editor = {
	counter: null,
	image: null,
	
	
	init: function(counter, image) {
		Editor.counter = counter;
		Editor.image = image;
		
		Editor.counter.initDrag();
	
		$('#date').datepicker().change(function(){Editor.counter.setDate($('#date').val(), $('#time').val())});
		$('#time').timePicker().change(function(){Editor.counter.setDate($('#date').val(), $('#time').val())});
		
		$('#counterpos').change(function(){
			var pos = $(this).val();
			var vpos = pos[0];
			var hpos = pos[1];
			Editor.counter.setPos(hpos, vpos);
		});

		$('#imgpos').change(function(){
			var pos = $(this).val();
			Editor.image.setPos(pos);
		});

		$('#imgstyle').change(function(){
			Editor.image.setSize($(this).val());
		});
		
		$('#imgfile').change(function(){
			 Editor.loadImage();
		});
	},
	
	//http://stackoverflow.com/questions/2865017/get-image-dimensions-using-javascript-during-file-upload/2865063#2865063
	loadImage: function() {
		var input, file, fr, img;

		if (typeof window.FileReader !== 'function') {
			alert("The file API isn't supported on this browser yet.");
			return;
		}

		input = document.getElementById('imgfile');
		if (!input) {
			alert("Um, couldn't find the imgfile element.");
		}
		else if (!input.files) {
			alert("This browser doesn't seem to support the `files` property of file inputs.");
		}
		else if (!input.files[0]) {
			alert("Please select a file before clicking 'Load'");
		}
		else {
			file = input.files[0];
			fr = new FileReader();
			fr.onload = function(){
				Editor.image.setImage(fr.result);
			}
			fr.readAsDataURL(file);
		}
	}
}

Editor.init(counter, image);