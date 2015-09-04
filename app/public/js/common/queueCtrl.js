'use strict';

app.controller('QueueCtrl', function($scope, $rootScope, queueService, $log, $timeout) {
    $scope.data = queueService.getAll();

    $scope.$on('activateQueue', function(event, data) {
        $scope.activateTrackInQueue();
    });

    // Listen to DOM mutation and react
    function addDOMmutationListener() {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
        var list = document.querySelector('.queueListView_list');

        var observer = new MutationObserver(function(mutations) {
            $log.log('mutation done', mutations);
            $scope.activateTrackInQueue();
        });

        observer.observe(list, {
            attributes: true,
            childList: true,
            characterData: true
        });
    }

    // quick hack to add DOM mutation listener
    $timeout(function() {
        addDOMmutationListener();
    }, 1000);

    $scope.activateTrackInQueue = function() {

        if ( $scope.data.length < 1 ) {
            return;
        }

        var trackId = queueService.getTrack().songId;
        var track = document.querySelector('.queueListView_list_item[data-song-id="' + trackId + '"]');
        var oldActive = document.querySelector('.queueListView_list_item.active');

        if ( oldActive ) {
            oldActive.classList.remove('active');
        }

        if ( track ) {
            track.classList.add('active');
        }
    };


    $scope.toggleQueue = function($event) {

        if ( $scope.data.length < 1 ) {
            return;
        }

        $event.currentTarget.classList.toggle('active');
        document.querySelector('.queueList').classList.toggle('active');

        //$scope.activateTrackInQueue();
    }
});