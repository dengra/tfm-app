// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionicitude-module'])

.run(function($ionicPlatform, Ionicitude) {
/*
  $ionicPlatform.registerBackButtonAction(function(e){
    e.preventDefault();
    console.log('close prevented');
  }, 100);
*/

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }



    // The code placed inside the $ionicPlatform.ready() function is executed only when the device is ready,
    // so this is a perfect place to call the Ionicitude.init() method.
    Ionicitude.init({reqFeatures: ['2d_tracking']})
      .then(function () {
        console.log('Here you go. Ionicitude is fully initialized !');
        // Now that Ionicitude is initialized, we can safely add the Actions that could be called from within an AR View.
        // Note that these actions will be executed by the Ionic WebView and in its context.
        // To call this captureScreen action, there should be, in one of your AR World JS code and assuming that you're using Ionicitude's CHM, something like :
        //  document.location = architectsdk://captureScreen
        // Ionicitude
        //   .addAction(captureScreen)
        //   .addAction(markerselected);

      })
      .catch(function (error) {
        console.log("Hu-ho..! Something has failed !", error);
      });


  });



})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html',
      controller: 'ARController'

    })

    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab' : {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })

    .state('tabs.learning-map', {
      url: '/learning-map',
      views: {
        'learning-map-tab' : {
          templateUrl: 'templates/learning-map.html',
          controller: 'LearningMapController'
        }
      }
    })
    .state('tabs.360View', {
      url: '/360View',
      views: {
        '360View-tab' : {
          templateUrl: 'templates/360View.html',
         controller: '360ViewController'
        }
      }
    })
    .state('tabs.about', {
      url: '/about',
      views: {
        'about-tab' : {
          templateUrl: 'templates/about.html'
        }
      }
    });


    /*.state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab' : {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })*/


  $urlRouterProvider.otherwise('/tab/home');
})
/*

.controller('CalendarController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.calendar = data.calendar;

      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      };

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

    });
}])
*/

.controller('ListController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.artists = data.artists;
      $scope.whichartist=$state.params.aId;

      $scope.modules = data.modules;
      $scope.whichmodule=$state.params.aId;

      $scope.cameras = data.cameras;
      $scope.whichcamera=$state.params.aId;

      $scope.data = { showDelete: false, showReorder: false };

      $scope.onItemDelete = function(item) {
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      };

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      };

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      };

      $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
    });
}])

.controller('LearningMapController', ['$scope', '$http', '$state',
    function($scope, $http, $state) {
    $http.get('js/data.json').success(function(data) {
      $scope.artists = data.artists;
      $scope.whichartist=$state.params.aId;

      $scope.modules = data.modules;
      $scope.whichmodule=$state.params.aId;

      $scope.cameras = data.cameras;
      $scope.whichcamera=$state.params.aId;

      //Nested Loop in JavaScript Way
      /*
      $scope.temparray = []

      var listElemt = null
      for (var i = 0; i < $scope.module.length; i++) {
        for (var j = 0; j < $scope.cameras.length; j++) {


          if(i.relevantmodels == cameras.shortname) {
            var listElement =
              {
                shortname: camera.shortname,
                relev: i.relevantmodels
            }
            $scope.temparray.push(listElemt)
          }
        }
      }
      */

    });
}])

  .controller('ARController',['$scope', 'Ionicitude', function ($scope, Ionicitude) {


    $scope.launchAR = function (ref) {
      try {
        // The ref passed as an argument to Ionicitude.launchAR() must be the name
        // of a directory in the wikitude-worlds directory.
        Ionicitude.launchAR(ref)
          .then(function () {
            console.log('OK ! The ' + ref + ' AR World has been perfectly launched !');
          })
          .catch(function (error) {
            console.log('Error while trying to launch the ' + ref + ' AR World.', error);
          })
      } catch (error) {
        console.log('But... Why ?! Something happened ?', error);
      }
    }
  } ])
;
