// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-native-transitions'])

  .run(function ($ionicPlatform, $http, $rootScope, $ionicHistory, $timeout, $ionicPopup, menuService, $interval,$ionicNativeTransitions) {
    $ionicPlatform.ready(function () {
      var backbutton = 0;
      $ionicPlatform.registerBackButtonAction(function (e) {
        e.preventDefault();
        if ($rootScope.modal && $rootScope.modal.isShown()) {
          $rootScope.modal.hide();
        } else if ($ionicHistory.currentStateName() == "home") {
          if (backbutton === 0) {
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
            title: '<span class="myText">هشدار</span>',
            template: '<div class="myText" style="font-size: 18px;padding: 12px;direction: rtl;text-align: right;line-height: 1.5em">آیا از انصراف اطمینان دارید؟</div>',
            buttons: [
              {
                text: '<img class="my-button" src="./img/bale.png">',
                onTap: function (e) {
                  var serverUrl = "https://dagala.cfapps.io/api/1/cancelRequest";
                  $http.post(serverUrl, $rootScope.battle.gameId).success(function (data, status, headers, config) {
                  }).catch(function (err) {
                    menuService.myHandleError(err);
                  });
                  $ionicNativeTransitions.goBack();
                }
              },
              {text: '<img class="my-button" src="./img/kheir.png">'}
            ]
          });
        } else {
          $ionicNativeTransitions.goBack();
        }
        menuService.stopLoading();
      }, 101);//registerBackButton

      if (window.navigator.simulator === true) {
        alert("بر روی شبیه ساز قابلیت اجرا وجود ندارد");
        navigator.app.exitApp();

      }
      if (device.isVirtual) {
        alert("بر روی شبیه ساز قابلیت اجرا وجود ندارد");
        navigator.app.exitApp();
      }
      inappbilling.init();
      tapsell.initialize('rnljdeagkbdqakojgecndcrbbfkgdfpdjqfnhablpjbpghfjsftnchctaqlejblmqdkmga');
      if(!$rootScope.myAudio){
        $rootScope.myAudio = new Media("http://dagala.ir/Era_Ameno.mp3");
      }
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(false);
      }
      document.addEventListener("pause", function () {
        if (!$rootScope.isMute) {
          $rootScope.myAudio.pause();
        }
      }, false);
      document.addEventListener("resume", function () {
        if (!$rootScope.isMute) {
          $rootScope.myAudio.play({numberOfLoops: 9999});
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
              $rootScope.changeUrl(url, true, challengeId);
            });
          });
        });
      };
      $rootScope.changeUrl = function (url, isNotTrain, challengeId) {
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
              template: '<div class="myText" style="padding: 12px;direction: rtl;text-align: right;line-height: 1.5em">    <div style="direction: rtl;padding-top: 20px;line-height: 3em;padding-right: 20px">' +
              '<span class="myText">رقیب شما بازی ای کرده که شما بدلیل عدم بروزرسانی آنرا ندارید. لطفا بازی را بروزرسانی کنید</span></div></div>',
              buttons: [
                {
                  text: '<img class="my-button" src="./img/15-dokme.png">',
                  onTap: function (e) {
                    menuService.startLoading();
                    $http.post("https://dagala.cfapps.io/api/1/rollback", $rootScope.battle.gameId + "," + challengeId + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
                      menuService.stopLoading();
                      navigator.app.exitApp();
                    }).catch(function (err) {
                      menuService.stopLoading();
                      navigator.app.exitApp();
                    });
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
      $rootScope.toggleList = function () {
        if ($rootScope.listState === "none") {
          $rootScope.listState = "half";
          $rootScope.games = $rootScope.gamer.halfGame;
          $("#endIcon").css("background", "url(img/2-natije-2.png) no-repeat right").css("background-size", "contain");
          $("#header").css("background", "url(img/half.png) no-repeat center").css("background-size", "35%");
          menuService.getDb().transaction(function (tx) {
            tx.executeSql('DELETE FROM MYGAME WHERE name="listState"', [], function (tx, results) {
              tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["listState", "none"]);
            });
          });
        } else if ($rootScope.listState === "half") {
          $rootScope.listState = "full";
          $rootScope.games = $rootScope.gamer.fullGame;
          $("#endIcon").css("background", "url(img/2-natije-1.png) no-repeat right").css("background-size", "contain");
          $("#header").css("background", "url(img/ended.png) no-repeat center").css("background-size", "35%");
          menuService.getDb().transaction(function (tx) {
            tx.executeSql('DELETE FROM MYGAME WHERE name="listState"', [], function (tx, results) {
              tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["listState", "half"]);
            });
          });
        } else {
          $rootScope.listState = "none";
          $rootScope.games = [];
          $("#endIcon").css("background", "url(img/2-natije-3.png) no-repeat right").css("background-size", "contain");
          $("#header").css("background", "none");
          menuService.getDb().transaction(function (tx) {
            tx.executeSql('DELETE FROM MYGAME WHERE name="listState"', [], function (tx, results) {
              tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["listState", "full"]);
            });
          });
        }
      };
      $rootScope.initializeList = function () {
        $rootScope.games = $rootScope.gamer.halfGame;
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="listState"', [], function (tx, results) {
            var len = results.rows.length, i, result = '';
            if (!results.rows || results.rows.length == 0) {
              $rootScope.listState = "none";
            } else {
              $rootScope.listState = results.rows.item(0).val;
            }
            $rootScope.toggleList();
          }, null);
        });
      };
      $rootScope.friendRequests = function (data) {
        angular.forEach(data.friendly, function (member, index) {
          $ionicPopup.alert({
            title: '<span class="myText">درخواست بازی داری</span>',
            template: '<div class="myText" style="font-size: 18px;padding: 12px;direction: rtl;text-align: right;line-height: 1.5em">بازیکن با نام کاربری ' + member.second.user + ' درخواست بازی با تورو داره، باهاش بازی میکنی؟</div>',
            buttons: [
              {
                text: '<img class="my-button" src="./img/bale.png">',
                onTap: function (e) {
                  menuService.startLoading();
                  $http.post("https://dagala.cfapps.io/api/1/acceptFriend", member.gameId)
                    .success(function (suc) {
                      menuService.stopLoading();
                      $rootScope.gamer.halfGame.push(member);
                      $rootScope.saveGamer($rootScope.gamer);
                      $rootScope.refreshHomeList();
                    })
                    .error(function (err) {
                      menuService.stopLoading();
                      menuService.myHandleError(err);
                    });
                }
              },
              {
                text: '<img class="my-button" src="./img/kheir.png">',
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
      };
      $rootScope.refreshGamer = function (refresh, scope) {
        var url = "https://dagala.cfapps.io/api/2/refresh";
        $http.post(url, $rootScope.gamer.user).success(function (data, status, headers, config) {
          data.pass = $rootScope.gamer.pass;
          data.token = $rootScope.gamer.token;
          $rootScope.saveGamer(data);
          $rootScope.friendRequests(data);
          $rootScope.refreshHomeList();
          if (refresh)
            scope.$broadcast('scroll.refreshComplete');
        }).catch(function (err) {
          menuService.myHandleError(err, true);
          if (refresh)
            scope.$broadcast('scroll.refreshComplete');
        });
      };
      $rootScope.refreshHomeList = function () {
        if ($rootScope.listState === "half") {
          $rootScope.games = $rootScope.gamer.halfGame;
        }
        if ($rootScope.listState === "full") {
          $rootScope.games = $rootScope.gamer.fullGame;
        }
      };
      var prepareUser = function (result) {
        if (result) {
          $rootScope.gamer = JSON.parse(result);
          $http.defaults.headers.common['Authorization'] = $rootScope.gamer.token;
          navigator.splashscreen.hide();
          $rootScope.refreshGamer(false, null);
          $rootScope.initializeList();
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
            } else {
              $rootScope.myAudio.play({numberOfLoops: 9999});
              $("#speaker").attr("src", "img/speaker.png");
            }
          }
        }, null);
      });
      var tiles = ['img/PNG/A01.png', 'img/PNG/A02.png', 'img/PNG/A03.png',
        'img/PNG/FA04.png', 'img/PNG/FA05.png', 'img/PNG/FB01.png', 'img/PNG/L01.png', 'img/PNG/L02.png', 'img/PNG/L04.png', 'img/PNG/FB02.png', 'img/PNG/FB03.png',
        'img/PNG/FB04.png', 'img/PNG/B02.png', 'img/PNG/B03.png', 'img/PNG/B04.png', 'img/PNG/FE05.png', 'img/PNG/FE01.png', 'img/PNG/FE02.png',
        'img/PNG/B05.png', 'img/PNG/C01.png', 'img/PNG/E01.png', 'img/PNG/FD01.png', 'img/PNG/FD02.png', 'img/PNG/FD03.png', 'img/PNG/G01.png', 'img/PNG/G03.png', 'img/PNG/O03.png', 'img/PNG/FH01.png',
        'img/PNG/FH02.png', 'img/PNG/FH05.png', 'img/PNG/N01.png', 'img/PNG/N02.png', 'img/PNG/N03.png', 'img/PNG/N04.png', 'img/PNG/N05.png',
        'img/PNG/poli1.png', 'img/PNG/poli2.png', 'img/PNG/poli3.png', 'img/PNG/poli4.png', 'img/PNG/poli5.png', 'img/PNG/poli6.png', 'img/PNG/poli7.png',
        'img/PNG/poli8.png', 'img/PNG/poli9.png', 'img/PNG/poli10.png'];
      var rowSize = Math.ceil(tiles.length / 3);
      $rootScope.rows = [];
      for (var i = 0; i < rowSize; i++) {
        $rootScope.rows.push(tiles.slice(i * 3, (i + 1) * 3));
      }
      $rootScope.checkLevel = function (isCallingFromTimeout) {
        if (isCallingFromTimeout) {
          if ($rootScope.gamer.newLevel) {
            menuService.myMessage("آفرین، سطح شما به " + $rootScope.gamer.level + " ارتقا پیدا کرد", "وقت بازی تمام شد");
          } else {
            menuService.myMessage("وقت بازی تمام شد");
          }
        } else if ($rootScope.gamer.newLevel) {
          menuService.myMessage("آفرین، سطح شما به " + $rootScope.gamer.level + " ارتقا پیدا کرد");
        }
        $rootScope.refreshHomeList();
      };
      $rootScope.sendToServer = function () {
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="wasInGame"', [], function (tx, results) {
            var len = results.rows.length, i, result = '';
            if (results.rows && results.rows.length !== 0) {
              if (results.rows.item(0).val === "true") {
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
                      var url = "https://dagala.cfapps.io/api/2/refresh";
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

      window.addEventListener('native.keyboardshow', keyboardShowHandler);
      window.addEventListener('native.keyboardhide', keyboardHideHandler);

      function keyboardShowHandler() {
        $('form').css("margin-top","25%");
        $('button').css("display","none");
        $('#backBtn').css("display","none");
        $('#helpBtn').css("display","none");
        $('#tab').css("top","6% !important");
      }

      function keyboardHideHandler() {
        $('form').css("margin-top","65%");
        $('button').css("display","block");
        $('#backBtn').css("display","block");
        $('#helpBtn').css("display","block");
        $('#tab').css("top","12% !important");
      }

      $rootScope.submenus = [{
        menuicon: 'img/puzzle.png',
        adr: 'puzzle/www.gameeapp.com/game/FGM7TVW2Ma.html',
        id: 5
      }, {
        menuicon: 'img/hexo.png',
        adr: 'hexon/www.gameeapp.com/game/xRkQk0iwI3.html',
        id: 7
      }, {
        menuicon: 'img/diamond.png',
        adr: 'diamond/gamee/game/index.html',
        id: 10
      }, {
        menuicon: 'img/hegza.png',
        adr: 'hegza/gamee/game/index.html',
        id: 11
      }, {
        menuicon: 'img/spinner.png',
        adr: 'spinner/www.gameeapp.com/game/ipUMpcUES.html',
        id: 2
      }, {
        menuicon: 'img/mr.png',
        adr: 'mr/www.gameeapp.com/game/WmHdqig.html',
        id: 8
      }, {
        menuicon: 'img/orbit.png',
        adr: 'orbit/gamee/game/index.html',
        id: 12
      }, {
        menuicon: 'img/school.png',
        adr: 'school/gamee/game/index.html',
        id: 13
      }, {
        menuicon: 'img/ninja.png',
        adr: 'ninja/www.gameeapp.com/game/G1oy49taR.html',
        id: 3
      }, {
        menuicon: 'img/space.png',
        adr: 'space/www.gameeapp.com/game/ibBTDViUP.html',
        id: 1
      }, {
        menuicon: 'img/qubo.png',
        adr: 'qubo/www.gameeapp.com/game/u0yXP5o.html',
        id: 9
      }, {
        menuicon: 'img/tire.png',
        adr: 'tire/gamee/game/index.html',
        id: 14
      }, {
        menuicon: 'img/motor.png',
        adr: 'motor/www.gameeapp.com/game/kAHVRl.html',
        id: 4
      }, {
        menuicon: 'img/car.png',
        adr: 'car/www.gameeapp.com/game/oFfW2omiW.html',
        id: 6
      }, {
        menuicon: 'img/football.png',
        adr: 'football/gamee/game/index.html',
        id: 15
      }, {
        menuicon: 'img/karate.png',
        adr: 'karate/gamee/game/index.html',
        id: 16
      }, {
        menuicon: 'img/sniper.png',
        adr: 'war/www.gameeapp.com/game/2cW21cuV3.html',
        id: 17
      }, {
        menuicon: 'img/delivery.png',
        adr: 'delivery/www.gameeapp.com/game/KubUJQ.html',
        id: 18
      }, {
        menuicon: 'img/meteoric.png',
        adr: 'meteoric/www.gameeapp.com/game/PrQHx2nBaS.html',
        id: 19
      }, {
        menuicon: 'img/flight.png',
        adr: 'snake/www.gameeapp.com/game/VVXl2nY.html',
        id: 20
      }];
      $rootScope.challengeMenu = [];
      $rootScope.boughtMenu = [];
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="cMenu"', [], function (tx, results) {
          var len = results.rows.length;
          if (results.rows && results.rows.length !== 0) {
            $rootScope.challengeMenu = JSON.parse(results.rows.item(0).val);
          }
        }, null);
      });
      $rootScope.startNotify = function () {
        if ($rootScope.refreshInterval)
          $rootScope.stopNotify();
        $rootScope.refreshInterval = $interval(function () {
          $http.post("https://dagala.cfapps.io/api/1/turn", $rootScope.gamer.user).success(function (data, status, headers, config) {
            if (data === 200 || data === '200') {
              cordova.plugins.notification.local.schedule({
                title: 'نوبت بازی شماست',
                icon: 'http://dagala.ir/img/logo.png'
              });
            }
          }).catch(function (err) {
          });
        }, 300000);
      };

      $rootScope.stopNotify = function () {
        $interval.cancel($rootScope.refreshInterval);
      };
      document.addEventListener("pause", $rootScope.startNotify(), false);
      document.addEventListener("resume", $rootScope.stopNotify(), false);
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

