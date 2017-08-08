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
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="score"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (results.rows && results.rows.length != 0) {
            var vals = results.rows.item(0).val.split(",");
            if (vals && vals[2]) {
              menuService.startLoading();
              var serverUrl = "https://dagala.cfapps.io/api/1/endGame";
              $http.post(serverUrl, vals[0] + "," + vals[1] + "," + vals[2]).success(function (data, status, headers, config) {
                menuService.stopLoading();
              }).catch(function (err) {
                // menuService.myHandleError(err, true);
                menuService.stopLoading();
              });
            }
            tx.executeSql('DELETE FROM MYGAME WHERE name="score"');
          }
        }, null);
      });
    });
    $scope.refresh = function () {
      $rootScope.initGamer(true,$scope);
    };
    $scope.isLeague = function () {
      return false;
    };
    $scope.challenge = function () {
      $state.go("newgame");
    };
    $scope.ranks = function () {
      $state.go("ranks")
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
    $scope.battlefield = function () {
      $state.go("battlefield");
    };
  })
  .controller('BoardCtrl', function ($scope, $timeout, $ionicHistory, menuService, $http, $rootScope, $location) {
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
      root = true;
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
        }, 500)
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
    $scope.menufun = function (s, id, url) {
      var myEl = angular.element(document.querySelector('.m'));
      myEl.toggleClass("active");
      $timeout(function () {
        myEl.toggleClass('omid');
      }, 500);
      if (root) {
        root = false;
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/games";
        $http.post(serverUrl, s).success(function (data, status, headers, config) {
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
        menuService.startLoading();
        if ($rootScope.isTrain) {
          clearDB();
          changeUrl(url);
        } else {
          var serverUrl = "https://dagala.cfapps.io/api/1/createGame";
          $http.post(serverUrl, $rootScope.battle.gameId + "," + id).success(function (data, status, headers, config) {
            menuService.getDb().transaction(function (tx) {
              tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
                tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", $rootScope.battle.gameId + "," + id], function (tx, results) {
                  changeUrl(url);
                });
              });
            });
          }).catch(function (err) {
            // menuService.myHandleError(err, true);
            menuService.stopLoading();
            reset();
            clearDB();
          });
        }
      }
    };
    function changeUrl(url) {
      window.location.assign(url);
    }

    function clearDB() {
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
        });
      });
    }

    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('BuyCtrl', function ($scope, $state) {
  })
  .controller('RanksCtrl', function ($scope, $state, $ionicHistory) {
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
      $http.post(url, "17").success(function (data, status, headers, config) {
        $rootScope.battle = data;
        if (data.status == "2"){
          $scope.myTurn = "";
          $scope.hisTurn = "نوبتشه";
        } else {
          $scope.myTurn = "نوبتته";
          $scope.hisTurn = "";
        }
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
        menuService.startLoading();
        loadData(false);
      }, 700)
    });
    $scope.play = function () {
      if ($rootScope.battle.first) {
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
    $scope.refresh = function () {
      loadData(true);
    };
    $scope.me = "img/PNG/A01.png";
    $scope.other = "img/PNG/A02.png";
    var fiveSeconds = new Date().getTime() + 6000;
    $('#clock').countdown(fiveSeconds, {elapse: true})
      .on('update.countdown', function (event) {
        var $this = $(this);
        if (event.elapsed) {
          $this.html(event.strftime('وقتت تموم شد'));
        } else {
          $this.html(event.strftime('وقت باقیمانده: <span>%H:%M:%S</span>'));
        }
      });
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
        menuService.startLoading();
        loadData(false);
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
    $scope.refresh = function () {
        loadData(true);
    };
    $scope.me = "img/PNG/A01.png";
    $scope.other = "img/PNG/A02.png";
    var fiveSeconds = new Date().getTime() + 6000;
    $('#clock').countdown(fiveSeconds, {elapse: true})
      .on('update.countdown', function (event) {
        var $this = $(this);
        if (event.elapsed) {
          $this.html(event.strftime('وقتت تموم شد'));
        } else {
          $this.html(event.strftime('وقت باقیمانده: <span>%H:%M:%S</span>'));
        }
      });
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory) {
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
        rememberMe: false
      };
      $http.post(url, data).success(function (data, status, headers, config) {
        $rootScope.username = data.username;
        $http.defaults.headers.common.Authorization = data.token;
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME');
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["user", JSON.stringify($rootScope.user)]);
        });
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
      var signUpUrl = "http://192.168.1.12:8080/api/1/forget";
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
      var signUpUrl = "http://192.168.1.12:8080/api/1/confirmReset";
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
      var signUpUrl = "http://192.168.1.12:8080/api/1/signup";
      var data = {
        username: $("#username"),
        mobile: $("#tel"),
        password: $("#pass"),
        avatar: $scope.avatar
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
            $rootScope.username = data.username;
            $ionicPopup.alert({
              title: '<span class="myText">پیام</span>',
              template: '<div class="myText" style="text-align: right">ثبت نام با شما با موفقیت انجام شد</div>'
            });
            $(".popup").css("width", "90%");
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

