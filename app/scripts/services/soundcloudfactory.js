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
.factory('soundcloudfactory', function ($window, $q, $sce) {

    //var imageurl = "www.image.com";
    //var cl_id = '927cd813d10aaf8f2040cd5ab3984734';
    //var redirect_uri = 'http://localhost:9000/sccallback.html';



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
        search: function(params) {
            var deferred = $q.defer();
              SC.get('/tracks', {'q':params.query, 'limit':params.limit, 'genres':params.genre, 'bpm[from]':params.minBpm, 'bpm[to]':params.maxBpm, 'duration[from]':params.minPlay, 'duration[to]':params.maxPlay}).then(function(tracks) {
                  deferred.resolve( tracks);
              });
            return deferred.promise;
        },
        createSongIframeFromId: function(id){
          var iframe = 'https://w.soundcloud.com/player/?visual=false&url=https://api.soundcloud.com/tracks/' + id + '&show_artwork=true&auto_play=false';
          return $sce.trustAsResourceUrl(iframe);
        }

    };
});
