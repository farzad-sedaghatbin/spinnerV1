// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-native-transitions'])

  .run(function ($ionicPlatform, $http, $rootScope, $ionicHistory, $timeout, $ionicPopup, menuService) {
    $ionicPlatform.ready(function () {
      var backbutton = 0;
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        if ($rootScope.modal && $rootScope.modal.isShown()) {
          $rootScope.modal.hide();
        } else if ($ionicHistory.currentStateName() == "home") {
          if (backbutton == 0) {
            backbutton++;
            window.plugins.toast.showShortBottom('برای خروج دوباره لمس کنید');
            $timeout(function () {
              backbutton = 0;
            }, 2000);
          } else {
            navigator.app.exitApp();
          }
        } else if ($ionicHistory.currentStateName() == "newgame") {
          $ionicPopup.alert({
            title: '<span class="myText">اخطار</span>',
            template: '<div class="myText" style="font-size: 24px;bottom: 12px;direction: rtl;text-align: right;line-height: 1.5em">آیا از انصراف اطمینان دارید؟</div>',
            buttons: [
              {
                text: '<img class="my-button" src="../img/bale.png">',
                onTap: function (e) {
                  var serverUrl = "https://dagala.cfapps.io/api/1/cancelRequest";
                  $http.post(serverUrl, $rootScope.battle.gameId).success(function (data, status, headers, config) {
                  }).catch(function (err) {
                    menuService.myHandleError(err);
                  });
                  $ionicHistory.goBack();
                }
              },
              {text: '<img class="my-button" src="../img/kheir.png">'}
            ]
          });
        } else {
          $ionicHistory.goBack();
        }
      }, 101);//registerBackButton

      // if (window.navigator.simulator === true) {
      //   alert("بر روی شبیه ساز قابلیت اجرا وجود ندارد");
      //   navigator.app.exitApp();
      //
      // }
      // if(device.isVirtual){
      //   alert("بر روی شبیه ساز قابلیت اجرا وجود ندارد");
      //   navigator.app.exitApp();
      // }
      // inappbilling.init();
      // tapsell.initialize('rnljdeagkbdqakojgecndcrbbfkgdfpdjqfnhablpjbpghfjsftnchctaqlejblmqdkmga');
      // if(!$rootScope.myAudio){
      //   $rootScope.myAudio = new Media("http://dagala.ir/Era_Ameno.mp3");
      //   if (!$rootScope.isMute) {
      //     $rootScope.myAudio.pause();
      //   }else {
      //     $rootScope.myAudio.play({numberOfLoops: 9999});
      //   }
      // }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      document.addEventListener("pause", function () {
        if (!$rootScope.isMute) {
          $rootScope.myAudio.pause();
        }
      }, false);
      document.addEventListener("resume", function () {
        if (!$rootScope.isMute) {
          $rootScope.myAudio.play({ numberOfLoops: 9999 });
        }
      }, false);
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
      $rootScope.isAndroid = function () {
        return ionic.Platform.isAndroid();
      };
      var db = openDatabase('mydb', '1.0', 'OMIDDB', 2 * 1024 * 1024);
      $rootScope.goToGame = function (url, challengeId) {
        db.transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "false," + $rootScope.battle.gameId + "," + challengeId + ",0," + $rootScope.homeURL + "," + $rootScope.gamer.user], function (tx, results) {
              $rootScope.changeUrl(url, true);
            });
          });
        });
      };
      $rootScope.changeUrl = function (url, isNotTrain) {
        $.ajax({
          type: 'GET',
          url: url,
          success: function () {
            if (isNotTrain) {
              db.transaction(function (tx) {
                tx.executeSql('DELETE FROM MYGAME WHERE name="wasInGame"', [], function (tx, results) {
                  tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["wasInGame", true], function (tx, results) {
                    window.location.replace(url);
                  });
                });
              });
            } else {
              window.location.replace(url);
            }
          },
          error: function () {
            menuService.stopLoading();
            $ionicPopup.alert({
              title: '<span class="myText">بروزرسانی</span>',
              template: '<div class="myText" style="padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">    <div style="direction: rtl;padding-top: 20px;line-height: 3em;padding-right: 20px">' +
              '<span class="myText">رقیب شما بازی ای کرده که شما بدلیل عدم بروزرسانی آنرا ندارید. لطفا بازی را بروزرسانی کنید</span></div></div>',
              buttons: [
                {
                  text: '<span class="myText">باشه</span>',
                  onTap: function (e) {
                    navigator.app.exitApp();
                  }
                }
              ]
            });
            $(".popup").css("width", "90%");
          }
        });
      };
      $rootScope.saveGamer = function (data) {
        $rootScope.gamer = data;
        db.transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="gamer"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["gamer", JSON.stringify($rootScope.gamer)]);
          });
        });
      };
      $rootScope.refreshGamer = function (refresh, scope) {
        var url = "https://dagala.cfapps.io/api/1/refresh";
        $http.post(url, $rootScope.gamer.user).success(function (data, status, headers, config) {
          data.pass = $rootScope.gamer.pass;
          data.token = $rootScope.gamer.token;
          $rootScope.saveGamer(data);
          angular.forEach(data.friendly, function (member, index) {
            $ionicPopup.alert({
              title: '<span class="myText">درخواست بازی داری</span>',
              template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">بازیکن با نام کاربری ' + member.second.user + ' درخواست بازی با تورو داره، باهاش بازی میکنی؟</div>',
              buttons: [
                {
                  text: '<span class="myText">باشه</span>',
                  onTap: function (e) {
                    $rootScope.gamer.halfGame.push(member);
                    $rootScope.saveGamer($rootScope.gamer);
                    $http.post("https://dagala.cfapps.io/api/1/acceptFriend", member.gameId)
                      .success(function (suc) {
                      })
                      .error(function (err) {
                        menuService.myHandleError(err);
                      });
                  }
                },
                {text: '<span class="myText">نه</span>',
                  onTap: function (e) {
                    $http.post("https://dagala.cfapps.io/api/1/rejectFriend", member.gameId)
                      .success(function (suc) {
                      })
                      .error(function (err) {
                        menuService.myHandleError(err);
                      });
                  }
                }
              ]
            });
          });
          if (refresh)
            scope.$broadcast('scroll.refreshComplete');
        }).catch(function (err) {
          menuService.myHandleError(err, true);
          if (refresh)
            scope.$broadcast('scroll.refreshComplete');
        });
      };
      var prepareUser = function (result) {
        if (result) {
          $rootScope.gamer = JSON.parse(result);
          $http.defaults.headers.common['Authorization'] = $rootScope.gamer.token;
          navigator.splashscreen.hide();
          $rootScope.refreshGamer(false,null);
        } else {
          var url = "https://dagala.cfapps.io/api/1/tempUser";
          $http.post(url).success(function (data, status, headers, config) {
            $http.defaults.headers.common['Authorization'] = data.token;
            data.pass = data.user;
            $rootScope.saveGamer(data);
            navigator.splashscreen.hide();
          }).catch(function (err) {
            menuService.myHandleError(err, false);
          });
        }
      };
      db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MYGAME (name , val)', [], function (tx, results) {
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
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="mute"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (!results.rows || results.rows.length == 0) {
            $rootScope.isMute = false;
          } else {
            $rootScope.isMute = results.rows.item(0).val === true || results.rows.item(0).val === "true";
            if ($rootScope.isMute) {
              $rootScope.myAudio.pause();
              $("#speaker").attr("src", "img/mute.png");
            }
          }
        }, null);
      });
      var tiles = ['img/PNG/A01.png', 'img/PNG/A02.png', 'img/PNG/A03.png',
        'img/PNG/FA04.png', 'img/PNG/FA05.png', 'img/PNG/FB01.png', 'img/PNG/L01.png', 'img/PNG/L02.png', 'img/PNG/L04.png', 'img/PNG/FB02.png', 'img/PNG/FB03.png',
        'img/PNG/FB04.png', 'img/PNG/B02.png', 'img/PNG/B03.png', 'img/PNG/B04.png', 'img/PNG/FE05.png', 'img/PNG/FE01.png', 'img/PNG/FE02.png',
        'img/PNG/B05.png', 'img/PNG/C01.png', 'img/PNG/C02.png', 'img/PNG/FC03.png', 'img/PNG/FC04.png', 'img/PNG/FC05.png', 'img/PNG/C03.png', 'img/PNG/C04.png',
        'img/PNG/E01.png', 'img/PNG/FD01.png', 'img/PNG/FD02.png', 'img/PNG/FD03.png', 'img/PNG/G01.png', 'img/PNG/G03.png', 'img/PNG/O03.png', 'img/PNG/FH01.png',
        'img/PNG/FH02.png', 'img/PNG/FH05.png', 'img/PNG/N01.png', 'img/PNG/N02.png', 'img/PNG/N03.png', 'img/PNG/N04.png', 'img/PNG/N05.png'];
      var rowSize = Math.ceil(tiles.length / 3);
      $rootScope.rows = [];
      for (var i = 0; i < rowSize; i++) {
        $rootScope.rows.push(tiles.slice(i * 3, (i + 1) * 3));
      }
      $rootScope.checkLevel = function(isCallingFromTimeout) {
        if (isCallingFromTimeout) {
          if ($rootScope.gamer.newLevel) {
            menuService.myMessage("آفرین، سطح شما به "+ $rootScope.gamer.level + " ارتقا پیدا کرد", "وقت بازی تمام شد");
          } else {
            menuService.myMessage("وقت بازی تمام شد");
          }
        } else if ($rootScope.gamer.newLevel) {
          menuService.myMessage("آفرین، سطح شما به "+ $rootScope.gamer.level + " ارتقا پیدا کرد");
        }
      };
      $rootScope.sendToServer = function () {
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="wasInGame"', [], function (tx, results) {
            var len = results.rows.length, i, result = '';
            if (results.rows && results.rows.length !== 0) {
              if (results.rows.item(0).val) {
                tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="score"', [], function (tx, results) {
                  var len = results.rows.length, i, result = '';
                  if (results.rows && results.rows.length !== 0) {
                    var vals = results.rows.item(0).val.split(",");
                    if (vals[0] === "false") {
                      menuService.startLoading();
                      var serverUrl = "https://dagala.cfapps.io/api/1/endGame";
                      $http.post(serverUrl, vals[1] + "," + vals[2] + "," + vals[3] + "," + vals[5]).success(function (data, status, headers, config) {
                        data.pass = $rootScope.gamer.pass;
                        data.token = $rootScope.gamer.token;
                        $rootScope.saveGamer(data);
                        menuService.stopLoading();
                        $rootScope.checkLevel(false);
                      }).catch(function (err) {
                        menuService.stopLoading();
                        menuService.myHandleError(err);
                      });
                    } else {
                      var url = "https://dagala.cfapps.io/api/1/refresh";
                      $http.post(url, $rootScope.gamer.user).success(function (data, status, headers, config) {
                        data.pass = $rootScope.gamer.pass;
                        data.token = $rootScope.gamer.token;
                        $rootScope.saveGamer(data);
                        $rootScope.checkLevel(false);
                      }).catch(function (err) {
                        menuService.myHandleError(err);
                      });
                    }
                    tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
                      tx.executeSql('DELETE FROM MYGAME WHERE name="wasInGame"');
                    });
                  }
                }, null);
              }
            }
          })
        });
      };
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $ionicNativeTransitionsProvider, $ionicConfigProvider) {
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 200
    });
    $ionicNativeTransitionsProvider.setDefaultTransition({
      type: 'slide',
      direction: 'left'
    });
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
      type: 'slide',
      direction: 'right'
    });
    $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
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
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl',
        templateUrl: 'profile.html'
      })
      .state('change-pass', {
        url: '/change-pass',
        controller: 'ChangePassCtrl',
        templateUrl: 'change-pass.html'
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
      .state('league', {
        url: '/league',
        controller: 'LeagueCtrl',
        templateUrl: 'league.html'
      })
      .state('select', {
        url: '/select',
        controller: 'SelectCtrl',
        templateUrl: 'select.html'
      })
      .state('username', {
        url: '/username',
        controller: 'UsernameCtrl',
        templateUrl: 'username.html'
      })
      .state('buy', {
        url: '/buy',
        controller: 'BuyCtrl',
        templateUrl: 'buy.html'
      });
    $urlRouterProvider.otherwise(function ($injector, $location) {
      $location.path("/home");
    });
  });

