// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','starter.controllers','starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    tapsell.initialize('rnljdeagkbdqakojgecndcrbbfkgdfpdjqfnhablpjbpghfjsftnchctaqlejblmqdkmga');
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'menu.html',
        controller: 'AppCtrl'
      })
      .state('app.home', {
        url: '/home',
        views: {
          'menuContent': {
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('app.board', {
        url: '/board',
        views: {
          'menuContent': {
            templateUrl: 'board.html',
            controller: 'BoardCtrl'
          }
        }
      })
      .state('app.battlefield', {
        url: '/battlefield',
        views: {
          'menuContent': {
            templateUrl: 'battlefield.html',
            controller: 'BattlefieldCtrl'
          }
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl: 'login.html'
      })
      .state('signup', {
        url: '/signup',
        controller: 'SignupCtrl',
        templateUrl: 'signup.html'
      })
      .state('forget', {
        url: '/forget',
        controller: 'ForgetCtrl',
        templateUrl: 'forget.html'
      })
      .state('coining', {
        url: '/coining',
        controller: 'CoiningCtrl',
        templateUrl: 'coining.html'
      })
      .state('wheel', {
        url: '/wheel',
        controller: 'WheelCtrl',
        templateUrl: 'wheel.html'
      })
      .state('invitation', {
        url: '/invitation',
        controller: 'InvitationCtrl',
        templateUrl: 'invitation.html'
      })
      .state('ranks', {
        url: '/ranks',
        controller: 'RanksCtrl',
        templateUrl: 'ranks.html'
      })
      .state('app.table', {
        url: '/table',
        views: {
          'menuContent': {
            templateUrl: 'table.html',
            controller: 'TableCtrl'
          }
        }
      })
      .state('buy', {
        url: '/buy',
        controller: 'BuyCtrl',
        templateUrl: 'buy.html'
      });
    $urlRouterProvider.otherwise(function ($injector,$location) {
      var db = openDatabase('mydb', '1.0', 'OMIDDB', 1024 * 1024);
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MYGAME (name , val)');
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="user"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (!results.rows || results.rows.length == 0) {
            result = null;
          } else {
            result = results.rows.item(0).log;
          }
          setUser(result)
        }, null);
      });
      var setUser = function (result) {
        if (!result) {
          $location.path("/login")
        } else {
          $location.path("/app/home")
        }
      };
    });
  });
app.run(function ($rootScope,$http) {
  var db = openDatabase('mydb', '1.0', 'OMIDDB', 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS MYGAME (name , val)');
    tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="user"', [], function (tx, results) {
      var len = results.rows.length, i, result = '';
      if (!results.rows || results.rows.length == 0) {
        result = null;
      } else {
        result = results.rows.item(0).log;
      }
      setUser(result)
    }, null);
  });
  var setUser = function (result) {
    if (result) {
      $rootScope.user = JSON.parse(result);
      $http.defaults.headers.common['Authorization'] = $rootScope.user.token;
    }
  }
});
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authHttpResponseInterceptor');
});
