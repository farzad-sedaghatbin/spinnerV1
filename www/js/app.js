// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic','starter.controllers','starter.services'])

.run(function($ionicPlatform,$http,$rootScope) {
  $ionicPlatform.ready(function() {
    // inappbilling.init();
    // tapsell.initialize('rnljdeagkbdqakojgecndcrbbfkgdfpdjqfnhablpjbpghfjsftnchctaqlejblmqdkmga');
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
    $rootScope.isAndroid = function () {
      return ionic.Platform.isAndroid();
    };
    var db = openDatabase('mydb', '1.0', 'OMIDDB', 1024 * 1024);
    $rootScope.goToGame = function (url, challengeId){
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "false," + $rootScope.battle.gameId + "," + challengeId + ",0,"+$rootScope.homeURL], function (tx, results) {
            $rootScope.changeUrl(url);
          });
        });
      });
    };
    $rootScope.changeUrl = function (url){
      window.location.assign(url);
    };
    $rootScope.saveGamer = function (data) {
      $rootScope.gamer = data;
      db.transaction(function (tx) {
        tx.executeSql('DELETE FROM MYGAME WHERE name="gamer"',[],function (tx, results) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["gamer", JSON.stringify($rootScope.gamer)]);
        });
      });
    };
    $rootScope.refreshGamer = function (refresh,scope) {
      var url = "https://dagala.cfapps.io/api/1/refresh";
      $http.post(url).success(function (data, status, headers, config) {
        data.pass = $rootScope.gamer.pass;
        data.token = $rootScope.gamer.token;
        $rootScope.saveGamer(data);
        if (refresh)
            scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        // menuService.myHandleError(err, true);
        if (refresh)
          scope.$broadcast('scroll.refreshComplete');
      });
    };
    var prepareUser = function (result) {
      if (result) {
        $rootScope.gamer = JSON.parse(result);
        $http.defaults.headers.common['Authorization'] = $rootScope.gamer.token;
      } else {
        var url = "https://dagala.cfapps.io/api/1/tempUser";
        $http.post(url).success(function (data, status, headers, config) {
          $http.defaults.headers.common['Authorization'] = data.token;
          data.pass = data.user;
          $rootScope.saveGamer(data);
        }).catch(function (err) {
          // menuService.myHandleError(err, true);
        });
      }
    };
    db.transaction(function (tx) {
      tx.executeSql('CREATE TABLE IF NOT EXISTS MYGAME (name , val)',[],function (tx, results) {
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="gamer"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (!results.rows || results.rows.length == 0) {
            result = null;
          } else {
            result = results.rows.item(0).val;
          }
          prepareUser(result)
        }, null);
      });
    });
    // $interval(function () {
    //   var url = "https://dagala.cfapps.io/api/1/refresh";
    //   $http.post(url).success(function (data, status, headers, config) {
    //   }).catch(function (err) {
    //     // menuService.myHandleError(err, true);
    //   });
    // }, 1000);
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
      .state('board', {
        url: '/board',
        controller: 'BoardCtrl',
        templateUrl: 'board.html'
      })
      .state('battlefield', {
        url: '/battlefield',
        controller: 'BattlefieldCtrl',
        templateUrl: 'battlefield.html',
        reload: true
      })
      .state('newgame', {
        url: '/newgame',
        controller: 'NewgameCtrl',
        templateUrl: 'newgame.html',
        reload: true
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
      $location.path("/app/home");
    });
  });
app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authHttpResponseInterceptor');
});
