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

  .controller('HomeCtrl', function ($scope, $state, $ionicModal, $rootScope, menuService, $http) {
    $scope.me = "img/PNG/A01.png";
    $scope.other = "img/PNG/A02.png";
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
                    var serverUrl = "https://dagala.cfapps.io/api/1/endGame";
                    $http.post(serverUrl, vals[1] + "," + vals[2] + "," + vals[3]).success(function (data, status, headers, config) {
                      $rootScope.saveGamer(data);
                      menuService.stopLoading();
                      checkLevel(false);
                    }).catch(function (err) {
                      // menuService.myHandleError(err, true);
                      menuService.stopLoading();
                    });
                  } else {
                    var url = "https://dagala.cfapps.io/api/1/refresh";
                    $http.post(url).success(function (data, status, headers, config) {
                      $rootScope.saveGamer(data);
                      checkLevel(false);
                    }).catch(function (err) {
                      // menuService.myHandleError(err, true);
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

    $scope.refresh = function () {
      $rootScope.refreshGamer(true, $scope);
    };
    $scope.isLeague = function () {
      return false;
    };
    $scope.challenge = function () {
      $rootScope.isTrain = false;
      $rootScope.callService = true;
      $state.go("newgame");
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

    function rootConfig() {
      $scope.config = {
        status: false,
        submenus: [
          {menuicon: 'icon ion-social-twitter', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-facebook', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-googleplus', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-github', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-whatsapp-outline', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-buffer-outline', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-windows', img: '', adr: 'javascript:;'},
          {menuicon: 'icon ion-social-html5', img: '', adr: 'javascript:;'}

        ]
      }
    }

    rootConfig();
    function reset() {
      var myEl = angular.element(document.querySelector('.m'));
      myEl.toggleClass('omid');
      $timeout(function () {
        root = true;
        myEl.toggleClass('active');
      }, 500);
      rootConfig();
    }

    $scope.toglefun = function ($config) {
      var myEl = angular.element(document.querySelector('.m'));
      if (root) {
        myEl.toggleClass('active');
      } else {
        myEl.toggleClass('omid');
        $timeout(function () {
          root = true;
          myEl.toggleClass('active');
        }, 500);
        $timeout(function () {
          $scope.config = {
            status: false,
            submenus: [
              {menuicon: 'icon ion-social-twitter', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-facebook', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-googleplus', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-github', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-whatsapp-outline', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-buffer-outline', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-windows', img: '', adr: 'javascript:;'},
              {menuicon: 'icon ion-social-html5', img: '', adr: 'javascript:;'}

            ]
          };
        }, 300)
      }

    };
    var index = null;
    $scope.menufun = function (s,id, url) {
      if (root) {
        root = false;
        var myEl = angular.element(document.querySelector('.m'));
        myEl.toggleClass("active");
        $timeout(function () {
          myEl.toggleClass('omid');
        }, 500);
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/games";
        $http.post(serverUrl, s+1).success(function (data, status, headers, config) {
          $scope.config.submenus = [];
          $(data).each(function (index, value) {
            $scope.config.submenus.push({menuicon: value.icon, adr: value.url, id: value.id})
          });
          menuService.stopLoading();
        }).catch(function (err) {
          menuService.myHandleError(err, true);
          menuService.stopLoading();
          reset();
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
          $scope.start(id,url);
        }
      }
    };
    function whichgoo(s) {
      switch (s) {
        case 0:
          gooyi(58, 39, 7, 65);
          break;
        case 1:
          gooyi(35,-42,-25,-36);
          break;
        case 2:
          gooyi(35,-42,-25,-36);
          break;
        case 3:
          gooyi(-35,45,30,62);
          break;
        case 4:
          gooyi(-35,-25,30,-45);
          break;
        case 5:
          gooyi(-35,45,30,62);
          break;
        case 6:
          gooyi(58, 39, 7, 65);
          break;
        case 7:
          gooyi(65,25,51,-30);
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
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "true," + id + "," + $rootScope.gamerInfo.token + ",0"], function (tx, results) {
              changeUrl(url);
            });
          });
        });
      } else {
        var serverUrl = "https://dagala.cfapps.io/api/1/createGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + id).success(function (data, status, headers, config) {
          menuService.getDb().transaction(function (tx) {
            tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
              tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "false," + $rootScope.battle.gameId + "," + id + ",0"], function (tx, results) {
                changeUrl(url);
              });
            });
          });
        }).catch(function (err) {
          // menuService.myHandleError(err, true);
          menuService.stopLoading();
          reset();
        });
      }
    };
    $scope.ranks = function (id) {
      $rootScope.selectedGame = id;
      $state.go("ranks");
    };
    function changeUrl(url) {
      window.location.assign(url);
    }

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
        $http.post("https://dagala.cfapps.io/api/1/records", $rootScope.selectedGame).success(function (data, status, headers, config) {
          $scope.ranks = data;
          menuService.stopLoading();
        }).catch(function (err) {
          // menuService.myHandleError(err, true);
          menuService.stopLoading();
        });
      } else {
        $http.post("https://dagala.cfapps.io/api/1/topPlayer").success(function (data, status, headers, config) {
          $scope.ranks = data;
          menuService.stopLoading();
        }).catch(function (err) {
          // menuService.myHandleError(err, true);
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
  .controller('InvitationCtrl', function ($scope, $state, $ionicHistory) {
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('WheelCtrl', function ($scope, $state, $ionicHistory) {
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
      var url = "https://dagala.cfapps.io/api/1/detailGame";
      $http.post(url, $rootScope.rowId).success(function (data, status, headers, config) {
        if (!$rootScope.isEnded) {
          processTiming(data)
        } else {
          showResults(data);
        }
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        // menuService.myHandleError(err, true);
        menuService.stopLoading();
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      });
    }

    function processTiming(data) {
      if ($rootScope.isEnded) {
        showResults(data);
      } else {
        if (data.timeLeft <= 0) {
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
          var fiveSeconds = new Date().getTime() + data.timeLeft;
          $('#clock').countdown(fiveSeconds, {elapse: true})
            .on('update.countdown', function (event) {
              var $this = $(this);
              if (event.elapsed) {
                $this.html(event.strftime('وقتت تموم شد'));
                callTimeoutService();
              } else {
                $this.html(event.strftime('وقت باقیمانده: <span>%H:%M:%S</span>'));
              }
            });
        }
      }
    }

    function showResults(data) {
      $rootScope.battle = data;
      menuService.stopLoading();
      $scope.loaded = true;
    }

    function callTimeoutService() {
      $http.post("https://dagala.cfapps.io/api/1/timeOut", $rootScope.rowId).success(function (data, status, headers, config) {
        $rootScope.saveGamer(data);
        $rootScope.timedOut = true;
        $state.go("app.home");
        menuService.stopLoading();
      }).catch(function (err) {
        // menuService.myHandleError(err, true);
        menuService.stopLoading();
      });
    }

    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        menuService.startLoading();
        loadData(false);
      }, 700)
    });
    $scope.play = function () {
      if ($rootScope.battle.gameDTOS.length == 2) {
        menuService.startLoading();
        var url = "https://dagala.cfapps.io/api/1/stopGame";
        $http.post(url, $rootScope.rowId).success(function (data, status, headers, config) {
          $rootScope.saveGamer(data);
          menuService.stopLoading();
          $state.go("app.home");
        }).catch(function (err) {
          // menuService.myHandleError(err, true);
          menuService.stopLoading();
        });
      } else if ($rootScope.battle.first) {
        menuService.startLoading();
        $location.path($rootScope.battle.gameId);
      } else {
        $rootScope.isTrain = false;
        $state.go("board");
      }
    };
    $scope.dontPlay = function () {
      menuService.myMessage("نوبت حریفته، بازیش که تموم شد نوبت تو میشه")
    };
    $scope.taslim = function () {
      menuService.startLoading();
      var url = "https://dagala.cfapps.io/api/1/stopGame";
      $http.post(url, $rootScope.rowId).success(function (data, status, headers, config) {
        $rootScope.saveGamer(data);
        menuService.stopLoading();
        $state.go("app.home");
      }).catch(function (err) {
        // menuService.myHandleError(err, true);
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
  .controller('NewgameCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $location) {
    $rootScope.battle;
    $scope.loaded = false;
    function loadData(refresh) {
      var url = "https://dagala.cfapps.io/api/1/requestGame";
      $http.post(url).success(function (data, status, headers, config) {
        $rootScope.battle = data;
        $rootScope.callService = false;
        menuService.stopLoading();
        $scope.loaded = true;
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        // menuService.myHandleError(err, true);
        menuService.stopLoading();
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        if ($rootScope.callService) {
          menuService.startLoading();
          loadData(false);
        }
      }, 700)
    });
    $scope.play = function () {
      // if (!$rootScope.battle.first){
      //   menuService.startLoading();
      //   $location.path($rootScope.data.gameId);
      // } else {
      $state.go("board");
      // }
    };
    $scope.me = "img/PNG/A01.png";
    $scope.other = "img/PNG/A02.png";
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory) {
    $scope.username;
    $scope.pass;
    $scope.doLogin = function () {
      var username = $("#username").val();
      var pass = $("#pass").val();
      if (!username || !pass)
        return;
      menuService.startLoading();
      delete $http.defaults.headers.common.Authorization;
      var url = "https://dagala.cfapps.io/api/1/user_authenticate";
      var data = {
        username: username,
        password: pass,
        rememberMe: true
      };
      $http.post(url, data).success(function (data, status, headers, config) {
        $http.defaults.headers.common.Authorization = data.token;
        $rootScope.gamerInfo = {username: data.username,pass:data.password,token: data.token,isGuest: false};
        $rootScope.saveGamerInfo();
        $rootScope.saveGamer();
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
  .controller('ForgetCtrl', function ($scope, $state, menuService, $http, $ionicPopup, $ionicHistory) {
    $scope.submit = function (username) {
      menuService.startLoading();
      var signUpUrl = "https://dagala.cfapps.io/api/1/forget";
      $http.post(signUpUrl, username)
        .success(function (suc) {
          if (suc == "201") {
            $ionicPopup.alert({
              title: '<span class="myText">خطا</span>',
              template: '<div class="myText" style="text-align: right">نام کاربری اشتباه می باشد</div>'
            });
          } else {
            $ionicPopup.alert({
              title: '<span class="myText">پیام</span>',
              template: '<div class="myText" style="text-align: right;direction: rtl">کد مورد نیاز برای تغییر کلمه عبور پیامک شد</div>'
            });
            $(".popup").css("width", "90%");
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
      var signUpUrl = "https://dagala.cfapps.io/api/1/confirmReset";
      $http.post(signUpUrl, JSON.stringify({code: code, password: password}))
        .success(function (suc) {
          menuService.stopLoading();
          if (suc == "200") {
            $ionicPopup.alert({
              title: '<span class="myText">پیام</span>',
              template: '<div class="myText" style="text-align: right;direction: rtl">کلمه عبور با موفقیت تغییر کرد</div>'
            });
            $state.go("login");
          } else if (suc == "301") {
            $ionicPopup.alert({
              title: '<span class="myText">پیام</span>',
              template: '<div class="myText" style="text-align: right;direction: rtl">خطا در عملیات. لطفا مجددا تلاش کنید</div>'
            });
            $state.go("login");
          } else {
            $ionicPopup.alert({
              title: '<span class="myText">پیام</span>',
              template: '<div class="myText" style="text-align: right;direction: rtl">کد اشتباه می باشد</div>'
            });
          }
          $(".popup").css("width", "90%");
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
  .controller('SignupCtrl', function ($scope, $ionicModal, menuService, $ionicPopup, $http, $state, $rootScope, $ionicHistory) {
    $scope.avatar = 'img/PNG/anon.png';
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
      var signUpUrl = "https://dagala.cfapps.io/api/1/signup";
      var data = {
        username: $("#username"),
        mobile: $("#tel"),
        password: $("#pass"),
        avatar: $scope.avatar,
        tempUser : $rootScope.gamerInfo.username
      };
      $http.post(signUpUrl, data)
        .success(function (suc) {
          if (suc == "201") {
            $ionicPopup.alert({
              title: '<span class="myText">خطا</span>',
              template: '<div class="myText" style="text-align: right">کاربر دیگری با نام کاربری شما قبلا ثبت نام کرده</div>'
            });
            menuService.stopLoading();
          } else {
            $ionicPopup.alert({
              title: '<span class="myText">پیام</span>',
              template: '<div class="myText" style="text-align: right">ثبت نام با شما با موفقیت انجام شد</div>'
            });
            $(".popup").css("width", "90%");
            $rootScope.gamerInfo.username = data.username;
            $rootScope.gamerInfo.pass = data.password;
            $rootScope.gamerInfo.isGuest = false;
            $rootScope.saveGamerInfo();
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

