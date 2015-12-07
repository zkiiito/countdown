var Editor = {
    counter: null,
    image: null,
    init: function (counter, image) {
        var that = this;
        that.counter = counter;
        that.image = image;

        this.initDrag();

        $('#editbtn').click(function () {
            $(this).hide();
            $('#editor').animate({right: 0});
        });

        $('#title').on('keyup keydown change', function () {
            $('title, .title').text($(this).val());
        });

        $('#date').datetimepicker().change(function () {
            that.counter.setDate($('#date').val());
        });

        $('#counterpos').change(function () {
            var pos = $(this).val();
            var vpos = pos[0];
            var hpos = pos[1];
            that.counter.setPos(hpos, vpos);
        });

        $('#imgpos').change(function () {
            var pos = $(this).val();
            that.image.setPos(pos);
        });

        $('#imgstyle').change(function () {
            that.image.setSize($(this).val());
        });

        $('#imgfile').change(function () {
            that.loadImage();
            $('#fakeimgfile').val($(this).val());
        });

        $('form').submit(function () {
            var form = $(this);

            if ('custom' === $('#counterpos').val()) {
                $('#counterpos-custom').val(that.counter.el.data('xpos') + '|' + that.counter.el.data('ypos'));
            } else {
                $('#counterpos-custom').val('');
            }

            console.log(form.serialize());
        });

        that.initValues();
    },
    afterSave: function () {
        alert('Saved!');
        $('#editor').animate({right: -170});
        $('#editbtn').show();
    },
    initValues: function () {
        if (counterValues) {
            for (var i in counterValues) {
                $('#' + i).val(counterValues[i]).triggerHandler('change');
            }
            if ($('#counterpos-custom').val().length) {
                var pos = $('#counterpos-custom').val().split('|');
                this.counter.setPos(pos[0], pos[1]);
            }
            image.setImage(counterValues['fakeimgfile']);
        }
    },

    initDrag: function () {
        var that = this;
        this.counter.el.draggable({
            containment: $('body'),
            scroll: false,
            start: function () {
                $('#counterpos').val('custom');
            },
            stop: function (event, ui) {
                ui.helper.data('xpos', ui.position.left / $(document).width() * 100);
                ui.helper.data('ypos', ui.position.top / $(document).height() * 100);

                that.counter.setPos(ui.helper.data('xpos'), ui.helper.data('ypos'));
            }
        });
    },
    //http://stackoverflow.com/questions/2865017/get-image-dimensions-using-javascript-during-file-upload/2865063#2865063
    loadImage: function () {
        var input, file, fr;
        var that = this;

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
            fr.onload = function () {
                that.image.setImage(fr.result);
            };
            fr.readAsDataURL(file);
        }
    }
};

Editor.init(counter, image);