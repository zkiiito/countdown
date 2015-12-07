var counterValues = {
	title: 'Délkelet-Ázsia 2015',
	date: '02/19/2016 13:50',
	counterpos: 'BL',
	imgpos: 'TC',
	imgstyle: 'cover',
	fakeimgfile: './photos/southeastasia.jpg'
};

$('title, .title').text(counterValues.title);
image.setImage(counterValues.fakeimgfile);
counter.setPos(counterValues.counterpos[1], counterValues.counterpos[0]);
image.setPos(counterValues.imgpos);
image.setSize(counterValues.imgstyle);
counter.setDate(counterValues.date);



/*
if ($('#counterpos-custom').val().length) {
    var pos = $('#counterpos-custom').val().split('|');
    this.counter.setPos(pos[0], pos[1]);
}
*/