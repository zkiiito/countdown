var express = require('express'),
    cons = require('consolidate'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart(),
    app = express(),
    config = require('./src/Config'),
    redis = require('./src/RedisClient');


app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname);
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/font', express.static(__dirname + '/font'));



app.get('/:counter', function (req, res) {
    redis.get('counter-' + req.params.counter, function (err, counterValues) {
         if (null === counterValues) {
            return res.redirect('/' + req.params.counter + '/edit');
        }

        counterValues = JSON.parse(counterValues);

        res.render('index', {
            title: counterValues.title,
            counterValues: counterValues
        });
    });
});

app.get('/:counter/edit', function (req, res) {
    redis.get('counter-' + req.params.counter, function (err, counterValues) {
        if (null === counterValues) {
            counterValues = {};
        } else {
            counterValues = JSON.parse(counterValues);
        }

        res.render('index', {
            title: counterValues.title,
            counterValues: counterValues,
            editor: true
        });
    });
});


app.post('/:counter/edit', multipartMiddleware, function (req, res) {
    var counterValues = req.body.counterValues;
    var password = req.body.password;

    if (password == config.adminPass) {
        if (req.files.imgfile) {
            //TODO upload
        }

        redis.set('counter-' + req.params.counter, JSON.stringify(counterValues));
        return res.send(JSON.stringify(1));
    }
    res.send(JSON.stringify(0));
});

app.listen(3000);
console.log('Express server listening on port 3000');
