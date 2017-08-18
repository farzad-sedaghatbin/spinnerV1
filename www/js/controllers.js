'use strict';
angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $ionicModal, menuService, $state, $http, $rootScope) {
    $scope.changePassM = function () {
      $ionicModal.fromTemplateUrl('templates/change-pass.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.mainModal = modal;
        $rootScope.mainModal.show();
      });
    };
    $scope.openContact = function () {
      $ionicModal.fromTemplateUrl('templates/contact.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.mainModal = modal;
        $rootScope.mainModal.show();
      });
    };
    $scope.logout = function () {
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('DELETE FROM ANIJUU WHERE name != ?', ["adv"]);
      });
      delete $http.defaults.headers.common.Authorization;
      if (menuService.isPlatformOld()) {
        $state.go("menuless.login-old")
      } else {
        $state.go("menuless.login")
      }
    };
  })

  .controller('HomeCtrl', function ($scope, $state, $ionicModal, $rootScope, menuService, $http,$ionicPopup) {
    $rootScope.homeURL = window.location.href;
    $scope.$on("$ionicView.enter", function (scopes, states) {
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="wasInGame"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (results.rows && results.rows.length != 0) {
            if (results.rows.item(0).val) {
              tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="score"', [], function (tx, results) {
                var len = results.rows.length, i, result = '';
                if (results.rows && results.rows.length != 0) {
                  var vals = results.rows.item(0).val.split(",");
                  if (vals[0]) {
                    menuService.startLoading();
                    var serverUrl = "http://192.168.1.157:8080/api/1/endGame";
                    $http.post(serverUrl, vals[1] + "," + vals[2] + "," + vals[3]).success(function (data, status, headers, config) {
                      $rootScope.saveGamer(data);
                      menuService.stopLoading();
                      checkLevel(false);
                    }).catch(function (err) {
                      // menuService.myHandleError(err);
                      menuService.stopLoading();
                    });
                  } else {
                    var url = "http://192.168.1.157:8080/api/1/refresh";
                    $http.post(url).success(function (data, status, headers, config) {
                      $rootScope.saveGamer(data);
                      checkLevel(false);
                    }).catch(function (err) {
                      // menuService.myHandleError(err);
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
      if ($rootScope.timedOut) {
        $rootScope.timedOut = false;
        checkLevel(true);
      }
    });
    function checkLevel(isCallingFromTimeout) {
      if (isCallingFromTimeout) {
        if ($rootScope.gamer.newLevel) {
          menuService.myMessage("New Level : " + $rootScope.gamer.level, "وقت بازی تمام شد");
        } else {
          menuService.myMessage("وقت بازی تمام شد");
        }
      } else if ($rootScope.gamer.newLevel) {
        menuService.myMessage("New Level : " + $rootScope.gamer.level);
      }
    }
    $scope.tiles = ['/img/PNG/A01.png', '/img/PNG/A02.png', '/img/PNG/A03.png', '/img/PNG/A01.png', '/img/PNG/A02.png', '/img/PNG/A03.png'];
    var rowSize = Math.ceil($scope.tiles.length / 3);
    $scope.rows = [];
    for (var i = 0; i < rowSize; i++) {
      $scope.rows.push($scope.tiles.slice(i * 3, (i + 1) * 3));
    }
    $scope.selectAvatar = function () {
      $ionicModal.fromTemplateUrl('avatars.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.modal = modal;
        modal.show();
      });
    };
    $scope.selected = function (url) {
      $rootScope.gamer.avatar = url;
      $rootScope.modal.hide();
      var serverUrl = "http://192.168.1.157:8080/api/1/changeAvatar";
      $http.post(serverUrl, url).success(function (data, status, headers, config) {
        $rootScope.saveGamer($rootScope.gamer);
      }).catch(function (err) {
        // menuService.myHandleError(err);
      });
    };
    $scope.refresh = function () {
      $rootScope.refreshGamer(true, $scope);
    };
    $scope.isLeague = function () {
      return false;
    };
    $scope.challenge = function () {
      if($rootScope.gamer.coins < $rootScope.gamer.perGameCoins){
        menuService.myMessage("سکه های شما کافی نیست. برای بدست آوردن سکه به قسمت سکه خواری در منو مراجعه کنید.","خطا");
        return;
      }
      if ($rootScope.gamer.halfGame.length == 5){
        menuService.myMessage("شما به سقف تعداد بازی نیمه تمام رسیده اید.","خطا");
        return;
      }
      $ionicPopup.alert({
        title: '<span class="myText">توجه</span>',
        template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">برای شروع بازی '+$rootScope.gamer.perGameCoins+' سکه از شما کم می شود، تمایل دارید؟</div>',
        buttons: [
          {text: '<span class="myText">باشه</span>',
            onTap: function(e) {
              $rootScope.isTrain = false;
              $rootScope.callService = true;
              $state.go("newgame");
            }
          },
          {text: '<span class="myText">نه</span>'}
        ]
      });
    };
    $scope.ranks = function () {
      $rootScope.selectedGame = null;
      $state.go("ranks");
    };
    $scope.register = function () {
      $state.go("signup")
    };
    $scope.changePass = function () {
      $state.go("login")
    };
    $scope.forgetPass = function () {
      $state.go("forget")
    };
    $scope.coining = function () {
      $state.go("coining");
    };
    $scope.training = function () {
      $rootScope.isTrain = true;
      $state.go("board");
    };
    $scope.help = function () {
      $ionicModal.fromTemplateUrl('help.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.modal = modal;
        modal.show();
      });
    };
    $scope.buy = function () {
      $state.go("buy")
    };
    $scope.battlefield = function (gameId, isEnded) {
      $rootScope.rowId = gameId;
      $rootScope.isEnded = isEnded;
      $state.go("battlefield");
    };
  })
  .controller('BoardCtrl', function ($scope, $timeout, $ionicHistory, menuService, $http, $rootScope, $state) {
    var root = true;

    function renderRoot() {
      var myEl = angular.element(document.querySelector('.m'));
      if (!root) {
        myEl.toggleClass('omid');
        $timeout(function () {
          myEl.toggleClass('active');
        }, 500);
      } else {
        $timeout(function () {
          if (!myEl.hasClass('active'))
            myEl.toggleClass('active');
        }, 400);
      }
      $timeout(function () {
        root = true;
        $scope.config = {
          status: true,
          submenus: [
            {menuicon: '', adr: 'javascript:;', text: 'فکری', style: {"font-size": "large"}, id: '1'},
            {menuicon: '', adr: 'javascript:;', text: 'اکشن', style: {"font-size": "large"}, id: '2'},
            {menuicon: '', adr: 'javascript:;', text: 'فرار', style: {"font-size": "large"}, id: '3'},
            {menuicon: '', adr: 'javascript:;', text: 'ورزشی', style: {"font-size": "large"}, id: '4'}
          ]
        };
      }, 300)
    }

    $scope.$on("$ionicView.enter", function (scopes, states) {
      renderRoot();
    });
    $scope.toglefun = function ($config) {
      var myEl = angular.element(document.querySelector('.m'));
      if (root) {
        myEl.toggleClass('active');
      } else {
        renderRoot();
      }

    };
    var index = null;
    $scope.menufun = function (s,id, url) {
      if (root) {
        menuService.startLoading();
        var serverUrl = "http://192.168.1.157:8080/api/1/games";
        $http.post(serverUrl, id).success(function (data, status, headers, config) {
          menuService.stopLoading();
          $scope.config.submenus = data;
          root = false;
          var myEl = angular.element(document.querySelector('.m'));
          myEl.toggleClass("active");
          $timeout(function () {
            myEl.toggleClass('omid');
          }, 100);
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
          renderRoot();
        });
      } else {
        if ($rootScope.isTrain) {
          if (index == null) {
            index = s;
            $("#a" + index).animate({
              height: '60px',
              width: '60px'
            }, 300);
            $("#i" + index).css("line-height", "60px");
            whichgoo(s);
            $(".text" + index).show(500);
          }
          else {
            $(".text" + index).hide(500);
            $('#object1' + index).css({
              'background-color': 'transparent',
              'transform': 'none',
              'pointerEvents': 'none'
            });
            $('#object2' + index).css({
              'background-color': 'transparent',
              'transform': 'none',
              'pointerEvents': 'none'
            });
            $("#a" + index).delay(300).animate({
              height: '70px',
              width: '70px'
            }, 300);
            $("#i" + index).delay(100).animate({
              'line-height': '70px'
            }, 300);
            if (s != index) {
              index = s;
              $("#a" + index).animate({
                height: '60px',
                width: '60px'
              }, 300);
              $("#i" + index).css("line-height", "60px");
              whichgoo(s);
              $(".text" + index).show(500);
            } else {
              index = null;
            }
          }
        } else {
          $scope.start(id, url);
        }
      }
    };
    function whichgoo(s) {
      switch (s) {
        case 0:
          gooyi(58, 39, 7, 65);
          break;
        case 1:
          gooyi(35, -42, -25, -36);
          break;
        case 2:
          gooyi(35, -42, -25, -36);
          break;
        case 3:
          gooyi(-35, 45, 30, 62);
          break;
        case 4:
          gooyi(-35, -25, 30, -45);
          break;
        case 5:
          gooyi(-35, 45, 30, 62);
          break;
        case 6:
          gooyi(58, 39, 7, 65);
          break;
        case 7:
          gooyi(65, 25, 51, -30);
          break;

      }
    }

    function gooyi(x1, y1, x2, y2) {
      $('#object1' + index).css({
        'background-color': 'green',
        'transform': 'translate(' + x1 + 'px, ' + y1 + 'px)',
        'pointerEvents': 'auto'
      });
      $('#object2' + index).css({
        'background-color': 'green',
        'transform': 'translate(' + x2 + 'px,' + y2 + 'px)',
        'pointerEvents': 'auto'
      });
    }

    $scope.start = function (id, url) {
      menuService.startLoading();
      if ($rootScope.isTrain) {
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "true," + id + "," + $rootScope.gamer.token + ",0," + $rootScope.homeURL], function (tx, results) {
              $rootScope.changeUrl(url);
            });
          });
        });
      } else {
        var serverUrl = "http://192.168.1.157:8080/api/1/createGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + id).success(function (data, status, headers, config) {
          $rootScope.goToGame(url, data);
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
          renderRoot();
        });
      }
    };
    $scope.ranks = function (id) {
      $rootScope.selectedGame = id;
      $state.go("ranks");
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('BuyCtrl', function ($scope, $state) {
  })
  .controller('RanksCtrl', function ($scope, $state, $ionicHistory, menuService, $http, $rootScope) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
      menuService.startLoading();
      var url;
      if ($rootScope.selectedGame != null) {
        $http.post("http://192.168.1.157:8080/api/1/records", $rootScope.selectedGame).success(function (data, status, headers, config) {
          $scope.ranks = data;
          menuService.stopLoading();
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
        });
      } else {
        $http.post("http://192.168.1.157:8080/api/1/topPlayer").success(function (data, status, headers, config) {
          $scope.ranks = data;
          menuService.stopLoading();
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
        });
      }
    });
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('TableCtrl', function ($scope, $state, $ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(false)
  })
  .controller('InvitationCtrl', function ($scope, $state, $ionicHistory, $http, $rootScope, menuService) {
    $scope.username;
    $scope.submit = function () {
      menuService.startLoading();
      $http.post("http://192.168.1.157:8080/api/1/inviteFriend", $("#username").val()).success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data == "404") {
          menuService.myMessage("نام کاربری اشتباه می باشد")
        } else if (data == "200") {
          menuService.myMessage("امتیاز معرف شما ثبت شد")
        }
      }).catch(function (err) {
        // menuService.myHandleError(err);
        menuService.stopLoading();
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('WheelCtrl', function ($scope, $state, $ionicHistory, menuService, $http, $rootScope) {
    $scope.spin = function (index) {
      var count = $(".triangle").length;
      var $spinner = $(".spinneromid");
      var value = index >= 0 ? index : parseInt(Math.random() * count);
      var preffix = "index-";
      $spinner.toggleClass("spin");
      $spinner[0].className = $spinner[0].className.replace(
        new RegExp("(^|\\s)" + preffix + "\\S+", "g"),
        ""
      );
      $spinner.addClass(preffix + value);
      $http.post("http://192.168.1.157:8080/api/1/rouletteWheel", value).success(function (data, status, headers, config) {
        if (data == "200") {
          $rootScope.gamer.coins += (value + 1);
        } else {
          menuService.myMessage("شما سهمیه امروز خود را دریافت کردید","خطا");
        }
      }).catch(function (err) {
        // menuService.myHandleError(err);
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('CoiningCtrl', function ($scope, $state, $ionicHistory) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.wheel = function () {
      $state.go("wheel");
    };
    $scope.invitation = function () {
      $state.go("invitation");
    };
    $scope.tapsell = function () {
      tapsell.requestAd(null, false, function (result) {
        if (result['action'] == 'onAdAvailable') {
          tapsell.showAd(result['adId'], true, true, tapsell_rotation_locked_portrait, false);
          tapsell.setRewardCallback(function (result) {
            if (result['action'] == 'onAdShowFinished') {
              if (result['completed'] && result['rewarded']) {
                alert("karbare dayus aya hal kardi ba tabligh?")
              }
            }
          });
        }
        else if (result['action'] == 'onNoAdAvailable') {

        }
        else if (result['action'] == 'onNoNetwork') {

        }
        else if (result['action'] == 'onError') {

        }
        else if (result['action'] == 'onExpiring') {

        }
      });
    }
  })
  .controller('BattlefieldCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $location) {
    $scope.loaded = false;
    function loadData(refresh) {
      var url = "http://192.168.1.157:8080/api/1/detailGame";
      $http.post(url, $rootScope.rowId).success(function (data, status, headers, config) {
        if (!$rootScope.isEnded) {
          processTiming(data)
        } else {
          showResults(data);
        }
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        // menuService.myHandleError(err);
        menuService.stopLoading();
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      });
    }

    function processTiming(data) {
      if ($rootScope.isEnded) {
        showResults(data);
      } else {
        if (data.timeLeft != null && data.timeLeft <= 0) {
          callTimeoutService();
        } else {
          if (data.status == "2") {
            $scope.myTurn = "";
            $scope.hisTurn = "نوبتشه";
          } else {
            $scope.myTurn = "نوبتته";
            $scope.hisTurn = "";
          }
          showResults(data);
          if (data.timeLeft != null) {
            var clock = new FlipClock($('#clock'), data.timeLeft, {
              clockFace: 'SecondCounter',
              autoStart: true,
              countdown: true,
              callbacks: {
                stop: function () {
                  menuService.startLoading();
                  callTimeoutService();
                },
                start: function () {
                  $('#clock').css("display", "block");
                }
              }
            });
          }
        }
      }
    }

    function showResults(data) {
      $rootScope.battle = data;
      menuService.stopLoading();
      $scope.loaded = true;
    }

    function callTimeoutService() {
      $http.post("http://192.168.1.157:8080/api/1/timeOut", $rootScope.rowId).success(function (data, status, headers, config) {
        $rootScope.saveGamer(data);
        $rootScope.timedOut = true;
        $state.go("app.home");
        menuService.stopLoading();
      }).catch(function (err) {
        // menuService.myHandleError(err);
        menuService.stopLoading();
      });
    }
    $scope.$on("$ionicView.beforeEnter", function (scopes, states) {
      $('#clock').css("display","none");
      $scope.loaded = false;
    });
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        menuService.startLoading();
        loadData(false);
      }, 700)
    });
    $scope.play = function () {
      if ($rootScope.battle.url && $rootScope.battle.status == "1") {
        menuService.startLoading();
        var serverUrl = "http://192.168.1.157:8080/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.gameDTOS[$rootScope.battle.gameDTOS.length - 1].challengeId).success(function (data, status, headers, config) {
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
        });
      } else if ($rootScope.battle.url && $rootScope.battle.status == "3") {
        menuService.startLoading();
        var serverUrl = "http://192.168.1.157:8080/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.url).success(function (data, status, headers, config) {
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
        });
      } else if (!$rootScope.battle.url && $rootScope.battle.status == "1") {
        $rootScope.isTrain = false;
        $state.go("board");
      }
    };
    $scope.dontPlay = function () {
      if ($rootScope.battle.user.user == null){
        menuService.myMessage("هنوز حریفی برای شما انتخاب نشده");
      } else {
        menuService.myMessage("نوبت حریفته، بازیش که تموم شد نوبت تو میشه");
      }
    };
    $scope.taslim = function () {
      menuService.startLoading();
      var url = "http://192.168.1.157:8080/api/1/stopGame";
      $http.post(url, $rootScope.rowId).success(function (data, status, headers, config) {
        $rootScope.saveGamer(data);
        menuService.stopLoading();
        $state.go("app.home");
      }).catch(function (err) {
        // menuService.myHandleError(err);
        menuService.stopLoading();
      });
    };
    $scope.refresh = function () {
      loadData(true);
    };
    $scope.me = "img/PNG/A01.png";
    $scope.other = "img/PNG/A02.png";
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('NewgameCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $ionicPopup) {
    function loadData(refresh) {
      var url = "http://192.168.1.157:8080/api/1/requestGame";
      $http.post(url).success(function (data, status, headers, config) {
        $rootScope.battle = data;
        if ($rootScope.battle.second != null && $rootScope.battle.second.user == $rootScope.gamer.user) {
          var swap = $rootScope.battle.first;
          $rootScope.battle.first = $rootScope.battle.second;
          $rootScope.battle.second = swap;
        }
        $rootScope.callService = false;
        menuService.stopLoading();
        $scope.loaded = true;
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        // menuService.myHandleError(err);
        menuService.stopLoading();
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.$on("$ionicView.beforeEnter", function (scopes, states) {
      $scope.loaded = false;
    });
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        if ($rootScope.callService) {
          menuService.startLoading();
          loadData(false);
        }
      }, 700)
    });
    $scope.play = function () {
      if ($rootScope.battle.second != null) {
        menuService.startLoading();
        var serverUrl = "http://192.168.1.157:8080/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.challengeList[$rootScope.battle.challengeList.length - 1].id).success(function (data, status, headers, config) {
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          // menuService.myHandleError(err);
          menuService.stopLoading();
          reset();
        });
      } else {
        $state.go("board");
      }
    };
    $scope.goBack = function () {
      $ionicPopup.alert({
        title: '<span class="myText">اخطار</span>',
        template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">آیا از انصراف اطمینان دارید؟</div>',
        buttons: [
          {text: '<span class="myText">بله</span>',
            onTap: function(e) {
              var serverUrl = "http://192.168.1.157:8080/api/1/cancelGame";
              $http.post(serverUrl, $rootScope.battle.gameId).success(function (data, status, headers, config) {
              }).catch(function (err) {
                // menuService.myHandleError(err);
              });
              $ionicHistory.goBack();
            }
          },
          {text: '<span class="myText">نه</span>'}
        ]
      });
    };
    var oldSoftBack = $rootScope.$ionicGoBack;
    $rootScope.$ionicGoBack = function () {
      $scope.goBack();
    };
    var deregisterSoftBack = function() {
      $rootScope.$ionicGoBack = oldSoftBack;
    };
    $scope.$on('$ionicView.leave', function() {
      deregisterSoftBack();
    });
  })
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory) {
    $scope.username;
    $scope.pass;
    $scope.doLogin = function () {
      var username = $("#username").val();
      var pass = $("#pass").val();
      menuService.startLoading();
      delete $http.defaults.headers.common.Authorization;
      var url = "http://192.168.1.157:8080/api/1/user_authenticate";
      var d = {
        username: username,
        password: pass,
        rememberMe: true
      };
      $http.post(url, d).success(function (data, status, headers, config) {
        $http.defaults.headers.common.Authorization = data.token;
        data.pass = d.password;
        $rootScope.saveGamer(data);
        menuService.stopLoading();
        $state.go("app.home");
      }).catch(function (err) {
        menuService.myHandleError(err, true);
        menuService.stopLoading();
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('ForgetCtrl', function ($scope, $state, menuService, $http, $ionicHistory) {
    $scope.submit = function (username) {
      menuService.startLoading();
      var signUpUrl = "http://192.168.1.157:8080/api/1/forget";
      $http.post(signUpUrl, username)
        .success(function (suc) {
          if (suc == "201") {
            menuService.myMessage("نام کاربری اشتباه می باشد", "خطا");
          } else {
            menuService.myMessage("کد مورد نیاز برای تغییر کلمه عبور پیامک شد");
            $scope.forgetPassCodeForm = true;
          }
          menuService.stopLoading();
        })
        .error(function (err) {
          menuService.myHandleError(err);
          menuService.stopLoading();
        });
    };
    $scope.confirm = function (code, password) {
      var signUpUrl = "http://192.168.1.157:8080/api/1/confirmReset";
      $http.post(signUpUrl, JSON.stringify({code: code, password: password}))
        .success(function (suc) {
          menuService.stopLoading();
          if (suc == "200") {
            menuService.myMessage("کلمه عبور با موفقیت تغییر کرد");
            $state.go("login");
          } else if (suc == "301") {
            menuService.myMessage("خطا در عملیات. لطفا مجددا تلاش کنید", "خطا");
            $state.go("login");
          } else {
            menuService.myMessage("کد اشتباه می باشد", "خطا");
          }
        })
        .error(function (err) {
          menuService.myHandleError(err);
          menuService.stopLoading();
        });
    };
    $scope.checkPassword = function (form, password, confirmPass) {
      var result = password !== confirmPass;
      $scope.result = result;
      form.confirmPass.$setValidity("validity", !result);
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('SignupCtrl', function ($scope, $ionicModal, menuService, $http, $state, $rootScope, $ionicHistory) {
    $scope.avatar = 'img/default.png';
    $scope.tiles = ['/img/PNG/A01.png', '/img/PNG/A02.png', '/img/PNG/A03.png', '/img/PNG/A01.png', '/img/PNG/A02.png', '/img/PNG/A03.png'];
    $scope.username;
    $scope.pass;
    $scope.tel;
    var rowSize = Math.ceil($scope.tiles.length / 3);
    $scope.rows = [];
    for (var i = 0; i < rowSize; i++) {
      $scope.rows.push($scope.tiles.slice(i * 3, (i + 1) * 3));
    }
    $scope.selectAvatar = function () {
      $ionicModal.fromTemplateUrl('avatars.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.modal = modal;
        modal.show();
      });
    };
    $scope.selected = function (url) {
      $scope.avatar = url;
      $rootScope.modal.hide()
    };
    $scope.signUp = function (form) {
      menuService.startLoading();
      var signUpUrl = "http://192.168.160.172:8080/api/1/signup";
      var d = {
        username: $("#username").val(),
        mobile: $("#tel").val(),
        password: $("#pass").val(),
        avatar: $scope.avatar,
        tempUser: $rootScope.gamer.user
      };
      $http.post(signUpUrl, d)
        .success(function (data, status, headers, config) {
          if (data == "400") {
            menuService.myMessage("کاربر دیگری با این نام کاربری قبلا ثبت نام کرده", "خطا");
            menuService.stopLoading();
          } else {
            menuService.myMessage("ثبت نام شما با موفقیت انجام شد");
            $rootScope.gamer.user = d.username;
            $rootScope.gamer.pass = d.password;
            $rootScope.gamer.token = data.token;
            $rootScope.saveGamer($rootScope.gamer);
            $state.go("menuless.login");
            menuService.stopLoading();
          }
        })
        .error(function (err) {
          menuService.myHandleError(err);
          menuService.stopLoading();
        });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  });

