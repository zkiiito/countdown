var FacebookBridge = {

    init: function() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '117631014938869',
                channelUrl : '//localhost/counter-html/channel.html', // Channel File for x-domain communication
                status     : true, // check the login status upon init?
                cookie     : true, // set sessions cookies to allow your server to access the session?
                xfbml      : true  // parse XFBML tags on this page?
            });

            // Additional initialization code such as adding Event Listeners goes here

        };

        (function(d, debug){
            var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement('script'); js.id = id; js.async = true;
            js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
            ref.parentNode.insertBefore(js, ref);
        }(document, false));
    },

    loginAndUpload: function(fileElement, callback) {
        var that = this;
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
                that.postPhoto(fileElement, function(src){
                    console.log(src);
                    callback(src);
                })
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'user_photos,publish_stream'});
    },

    postPhoto: function(fileElement, callback) {
        var url = 'https://graph.facebook.com/me/photos?access_token=' + FB.getAccessToken();
        var data = new FormData();
        data.append('file', fileElement[0].files[0]);

        $.ajax({
            url: url,
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            dataType: 'json',
            type: 'POST',
            success: function(data){
                console.log(data);
                FB.api('/' + data.id, 'get', function(data){
                    console.log(data);
                    callback(data.images[0].source);//original
                });
            }
        });
    }
};

FacebookBridge.init();