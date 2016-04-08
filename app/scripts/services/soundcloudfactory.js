// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
'use strict';

/**
* @ngdoc service
* @name iprogApp.soundcloudfactory.js
* @description
* # soundcloudfactory
* Factory in the iprogApp.
*/
angular.module('iprogApp')
.factory('soundcloudfactory', function ($resource, $window, $q) {

    //var imageurl = "www.image.com";
    var cl_id = '927cd813d10aaf8f2040cd5ab3984734';
    var redirect_uri = 'http://localhost:9000/sccallback.html';

    var Tracks = $resource('http://api.soundcloud.com/tracks?client_id='+cl_id+'&limit=10');

    // Public API here
    return {
        ScTest: function () {
            $window.SC.connect().then(function(me) {
                console.log(me.description);
            });
        },
        putDescription: function () {
            $window.SC.put('/me', {
                user: { description: 'This is a test message! :)' }
            });
        },
        getUserName: function () {
            $window.SC.get('/me').then(function(me) {
                $window.alert(me.username);
            });
        },
        getSong: function () {
            var track_url = 'https://soundcloud.com/hexagon/madison-mars-milky-way-radio-edit';
            $window.SC.oEmbed(track_url, { auto_play: false }).then(function(response) {
                console.log('Object Response', response);
                $window.alert('SoundCloud channel: ' + response.author_name + ', ' + 'Track name: ' + response.title);
            });
        },
/*
        search: function() {

            $window.SC.get('/tracks', {q:'fish', limit:11}).then(function(tracks) {
                console.log(tracks);
                return (tracks);
            });
        },*/

        srch: function() {
            
        }


    };
});