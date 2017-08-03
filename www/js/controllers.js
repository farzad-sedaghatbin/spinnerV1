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

  .controller('HomeCtrl', function ($scope, $state, $ionicModal) {
    $scope.me = "img/PNG/A01.png";
    $scope.other = "img/PNG/A02.png";
    $scope.isLeague = function () {
      return false;
    };
    $scope.coining = function () {
      $state.go("app.coining");
    };
    $scope.training = function () {
      $state.go("app.board");
    };
    $scope.buy = function () {
      $state.go("buy")
    };
    $scope.battlefield = function () {
      $state.go("app.battlefield");
    };
  })
  .controller('BoardCtrl', function ($scope, $timeout) {
    var root = true;
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
    $scope.menufun = function (s) {
      root = false;
      var myEl = angular.element(document.querySelector('.m'));
      myEl.toggleClass("active");
      $timeout(function () {
        myEl.toggleClass('omid');
      }, 500)
      switch (s) {
        case 1:
          $scope.config = {
            status: false,
            submenus: [
              {menuicon: 'icon ion-social-twitter', img: '', adr: 'spinner/spinner.html'},
              {menuicon: 'icon ion-social-facebook', img: '', adr: 'motor/www.gameeapp.com/game/kAHVRl.html'},
              {menuicon: 'icon ion-social-googleplus', img: '', adr: 'space/www.gameeapp.com/game/ibBTDViUP.html'},
              {
                menuicon: 'icon ion-social-whatsapp-outline',
                img: '',
                adr: 'ninja/www.gameeapp.com/game/G1oy49taR.html'
              },
              {
                menuicon: 'icon ion-social-buffer-outline',
                img: '',
                adr: 'puzzle/www.gameeapp.com/game/FGM7TVW2Ma.html'
              },
              {menuicon: 'icon ion-social-windows', img: '', adr: 'car/www.gameeapp.com/game/oFfW2omiW.html'}
            ]
          }
          break;
        case 2:
          console.log('facebook');
          break;
        case 3:
          console.log('googleplus');
          break;
        case 4:
          console.log('github');
          break;
        case 5:
          console.log('whatsapp');
          break;
        case 6:
          console.log('buffer');
          break;
        case 7:
          console.log('window');
          break;
        case 8:
          console.log('html');
          break;
        default :
          break;
      }
    }
  })
  .controller('BuyCtrl', function ($scope, $state) {
  })
  .controller('TableCtrl', function ($scope, $state,$ionicSideMenuDelegate) {
    $ionicSideMenuDelegate.canDragContent(false)
  })
  .controller('InvitationCtrl', function ($scope, $state) {
  })
  .controller('WheelCtrl', function ($scope, $state) {
    $scope.spin = function(index) {
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
  })
  .controller('CoiningCtrl', function ($scope, $state) {
    $scope.goHome = function () {
      $state.go("app.home")
    };
    $scope.wheel = function () {
      $state.go("app.wheel");
    };
    $scope.invitation = function () {
      $state.go("app.invitation");
    };
    $scope.tapsell = function () {
      tapsell.requestAd(null, false, function(result){
        if(result['action']=='onAdAvailable')
        {
          tapsell.showAd(result['adId'], true, true, tapsell_rotation_locked_portrait , false);
          tapsell.setRewardCallback(function (result){
            if(result['action']=='onAdShowFinished')
            {
              if (result['completed'] && result['rewarded']){
                alert("karbare dayus aya hal kardi ba tabligh?")
              }
            }
          });
        }
        else if( result['action']=='onNoAdAvailable' )
        {

        }
        else if( result['action']=='onNoNetwork' )
        {

        }
        else if( result['action']=='onError' )
        {

        }
        else if(result['action']=='onExpiring')
        {

        }
      });
    }
  })
  .controller('BattlefieldCtrl', function ($scope, $state) {
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
  })
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $http, menuService) {
    $scope.doLogin = function () {
      var username = $("#username");
      var pass = $("#pass");
      if (!username || !pass)
        return;
      menuService.startLoading();
      delete $http.defaults.headers.common.Authorization;
      var url = "http://192.168.1.12:8080/api/1/user_authenticate";
      var data = {
        username: username,
        password: pass,
        rememberMe: false
      };
      $http.post(url, data).success(function (data, status, headers, config) {
        $rootScope.user = {
          username:data.username,
          avatar:data.avatar,
          coins:data.coins,
          scores:data.scores,
          token:data.token
        };
        $http.defaults.headers.common.Authorization = data.token;
        var user = JSON.stringify($rootScope.user);
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["user", user]);
        });
        $state.go("home");
      }).catch(function (err) {
          menuService.myHandleError(err, true);
          menuService.stopLoading();
        });
    }
  })
  .controller('ForgetCtrl', function ($scope, $state,menuService,$http,$ionicPopup) {
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
  })
  .controller('SignupCtrl', function ($scope, $ionicModal,menuService,$ionicPopup,$http,$state,$rootScope) {
    $scope.avatar = 'img/PNG/anon.png';
    $scope.tiles = ['/img/PNG/A01.png', '/img/PNG/A02.png', '/img/PNG/A03.png','/img/PNG/A01.png', '/img/PNG/A02.png', '/img/PNG/A03.png'];
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
        avatar:$scope.avatar
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
            $state.go("menuless.login");
            menuService.stopLoading();
          }
        })
        .error(function (err) {
          menuService.myHandleError(err);
          menuService.stopLoading();
        });
    };
  });

