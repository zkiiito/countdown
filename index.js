var fs = require('fs'),
    express = require('express'),
    cons = require('consolidate'),
    multipart = require('connect-multiparty'),
    cloudinary = require('cloudinary'),
    config = require('./src/Config'),
    redis = require('./src/RedisClient'),
    multipartMiddleware = multipart(),
    app = express();

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
        counterValues = null === counterValues ? {} : JSON.parse(counterValues);

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
        redis.get('counter-' + req.params.counter, function (err, counterValuesRedis) {
            if (req.files.imgfile && req.files.imgfile.size > 0) {
                var stream = cloudinary.uploader.upload_stream(function (result) {
                    counterValues.fakeimgfile = result.url;
                    redis.set('counter-' + req.params.counter, JSON.stringify(counterValues));
                    res.send(JSON.stringify(1));
                });

                fs.createReadStream(req.files.imgfile.path).pipe(stream);
            } else {
                counterValuesRedis = null === counterValuesRedis ? {} : JSON.parse(counterValuesRedis);

                counterValues.fakeimgfile = counterValuesRedis.fakeimgfile;
                redis.set('counter-' + req.params.counter, JSON.stringify(counterValues));
                return res.send(JSON.stringify(1));
            }
        });
    } else {
        res.send(JSON.stringify(0));
    }
});

app.listen(config.port);
console.log('Express server listening on port ' + config.port);
