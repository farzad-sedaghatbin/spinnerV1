'use strict';
angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $state, $ionicModal, $rootScope, menuService, $http, $ionicPopup,$timeout) {
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
                  if (vals[0] == "false") {
                    menuService.startLoading();
                    var serverUrl = "https://dagala.cfapps.io/api/1/endGame";
                    $http.post(serverUrl, vals[1] + "," + vals[2] + "," + vals[3]+","+vals[5]).success(function (data, status, headers, config) {
                      data.pass = $rootScope.gamer.pass;
                      data.token = $rootScope.gamer.token;
                      $rootScope.saveGamer(data);
                      menuService.stopLoading();
                      checkLevel(false);
                    }).catch(function (err) {
                      menuService.stopLoading();
                      menuService.myHandleError(err);
                    });
                  } else {
                    var url = "https://dagala.cfapps.io/api/1/refresh";
                    $http.post(url,$rootScope.gamer.user).success(function (data, status, headers, config) {
                      data.pass = $rootScope.gamer.pass;
                      data.token = $rootScope.gamer.token;
                      $rootScope.saveGamer(data);
                      checkLevel(false);
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
    $rootScope.isMute = false;
    $scope.speaker = function () {
      if ($rootScope.isMute){
        document.getElementById("myAudio").muted = false;
        $("#speaker").attr("src","img/speaker.png");
        $rootScope.isMute = false;
      } else {
        document.getElementById("myAudio").muted = true;
        $("#speaker").attr("src","img/mute.png");
        $rootScope.isMute = true;
      }
    };
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
      var serverUrl = "https://dagala.cfapps.io/api/1/changeAvatar";
      $http.post(serverUrl, url+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        $rootScope.saveGamer($rootScope.gamer);
      }).catch(function (err) {
        menuService.myHandleError(err);
      });
    };
    $scope.refresh = function () {
      $rootScope.refreshGamer(true, $scope);
    };
    $scope.challenge = function () {
      if ($rootScope.gamer.coins < $rootScope.gamer.perGameCoins) {
        menuService.myMessage("سکه های شما کافی نیست. برای بدست آوردن سکه به قسمت سکه خواری در منو مراجعه کنید.", "خطا");
        return;
      }
      if ($rootScope.gamer.halfGame.length == 5) {
        menuService.myMessage("شما به سقف تعداد بازی نیمه تمام رسیده اید.", "خطا");
        return;
      }
      $ionicPopup.alert({
        title: '<span class="myText">توجه</span>',
        template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">برای شروع بازی ' + $rootScope.gamer.perGameCoins + ' سکه از شما کم می شود، تمایل دارید؟</div>',
        buttons: [
          {
            text: '<span class="myText">باشه</span>',
            onTap: function (e) {
              $rootScope.isTrain = false;
              $rootScope.callService = true;
              $rootScope.isLeague = false;
              $rootScope.gamer.coins -= $rootScope.gamer.perGameCoins;
              $rootScope.hasPaid = false;
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
    $scope.league = function () {
      $rootScope.isLeague = true;
      $state.go("league");
    };
    $scope.training = function () {
      $rootScope.battle = null;
      $rootScope.isTrain = true;
      $rootScope.isLeague = false;
      $state.go("board");
    };
    $scope.help = function () {
      menuService.homeHelp();
    };
    $scope.buy = function () {
      $state.go("buy")
    };
    $scope.battlefield = function (gameId, isEnded) {
      $rootScope.rowId = gameId;
      $rootScope.isEnded = isEnded;
      $state.go("battlefield");
    };
    var halfs = true;
    var ends = true;
    $scope.toggleHalfs = function () {
      if (halfs) {
        halfs = false;
        $(".myhalfs").hide("slow");
        $("#halfIcon").css("background", "url(img/hide.png) no-repeat center").css("background-size", "contain");
      } else {
        halfs = true;
        $(".myhalfs").show("slow");
        $("#halfIcon").css("background", "url(img/show.png) no-repeat center").css("background-size", "contain");
      }
    };
    $scope.toggleEnds = function () {
      if (ends) {
        ends = false;
        $(".myends").hide("slow");
        $("#endIcon").css("background", "url(img/hide.png) no-repeat center").css("background-size", "contain");
      } else {
        ends = true;
        $(".myends").show("slow");
        $("#endIcon").css("background", "url(img/show.png) no-repeat center").css("background-size", "contain");
      }
    };
    $timeout(function () {
      menuService.homeTutorial();
    },700);
  })
  .controller('BoardCtrl', function ($scope, $timeout, $ionicHistory, menuService, $http, $rootScope, $state, $ionicModal,$ionicPopup) {
    var root = true;
    $timeout(function () {
      menuService.boardTutorial();
    },700);
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
        if ($rootScope.isTrain || $rootScope.hasPaid) {
          $scope.config = {
            status: true,
            submenus: [
              {menuicon: '', adr: 'javascript:;', text: 'فکری', style: {"font-size": "large"}, id: 1, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'اکشن', style: {"font-size": "large"}, id: 2, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'فرار', style: {"font-size": "large"}, id: 3, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'ورزشی', style: {"font-size": "large"}, id: 4, style2: false}
            ]
          };
        } else {
          var arr = [];
          while(arr.length < 2){
            var randomnumber = Math.floor(Math.random() * 4) + 1;
            if(arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
          }
          $scope.config = {
            status: true,
            submenus: [
              {menuicon: '', adr: 'javascript:;', text: 'فکری', style: {"font-size": "large"}, id: 1, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'اکشن', style: {"font-size": "large"}, id: 2, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'فرار', style: {"font-size": "large"}, id: 3, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'ورزشی', style: {"font-size": "large"}, id: 4, style2: false}
            ]
          };
          var newMenu = [];
          angular.forEach($scope.config.submenus, function(member, index){
            if (arr.indexOf(member.id)>-1){
              newMenu.push(member);
            }
          });
          $scope.config.submenus = newMenu;
        }
      }, 300)
    }
    $scope.releaseMore = function () {
      $ionicPopup.alert({
        title: '<span class="myText">اخطار</span>',
        template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">آیا از خرید اطمینان دارید؟</div>',
        buttons: [
          {
            text: '<span class="myText">بله</span>',
            onTap: function (e) {
              if ($rootScope.gamer.coins < 60){
                menuService.myMessage("سکه های شما برای آزاد کردن دسته بندی ها کافی نیست", "خطا");
                return;
              }
              menuService.startLoading();
              $http.post("https://dagala.cfapps.io/api/1/expandMenu",$rootScope.gamer.user).success(function (data, status, headers, config) {
                menuService.stopLoading();
                $scope.config.submenus = [
                  {menuicon: '', adr: 'javascript:;', text: 'فکری', style: {"font-size": "large"}, id: 1, style2: false},
                  {menuicon: '', adr: 'javascript:;', text: 'اکشن', style: {"font-size": "large"}, id: 2, style2: false},
                  {menuicon: '', adr: 'javascript:;', text: 'فرار', style: {"font-size": "large"}, id: 3, style2: false},
                  {menuicon: '', adr: 'javascript:;', text: 'ورزشی', style: {"font-size": "large"}, id: 4, style2: false}
                ];
                $rootScope.gamer.coins -= 60;
                $rootScope.hasPaid = true;
              }).catch(function (err) {
                menuService.stopLoading();
                menuService.myHandleError(err);
              });
            }
          },
          {text: '<span class="myText">نه</span>'}
        ]
      });
    };
    $scope.$on("$ionicView.enter", function (scopes, states) {
      renderRoot();
      if (!$rootScope.isTrain) {
      }
    });
    $scope.toglefun = function ($config) {
      var myEl = angular.element(document.querySelector('.m'));
      if (root) {
        myEl.toggleClass('active');
      } else {
        renderRoot();
        if (!$rootScope.isTrain) {
          $("#release").css("display", "block");
        }
      }

    };
    var index = null;
    $scope.menufun = function (s, id, url) {
      if (root) {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/games";
        $http.post(serverUrl, $rootScope.isTrain ? "train" + "," + id : $rootScope.battle.gameId + "," + id).success(function (data, status, headers, config) {
          menuService.stopLoading();
          $scope.config.submenus = data;
          root = false;
          var myEl = angular.element(document.querySelector('.m'));
          myEl.toggleClass("active");
          $timeout(function () {
            myEl.toggleClass('omid');
          }, 100);
          if (!$rootScope.isTrain) {
            $("#release").css("display", "none");
          }
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
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
    $scope.help = function () {
      menuService.boardHelp();
    };
    $scope.start = function (id, url) {
      menuService.startLoading();
      if ($rootScope.isLeague && $rootScope.battle.status == "10") {
        $http.post("https://dagala.cfapps.io/api/1/createLeagueGame", $rootScope.leagueId + "," + id+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
          $rootScope.goToGame(url, data);
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
          renderRoot();
        });
      } else {
        if ($rootScope.isTrain) {
          menuService.getDb().transaction(function (tx) {
            tx.executeSql('DELETE FROM MYGAME WHERE name="score"', [], function (tx, results) {
              tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "true," + id + "," + $rootScope.gamer.token + ",0," + $rootScope.homeURL+","+$rootScope.gamer.user], function (tx, results) {
                $rootScope.changeUrl(url);
              });
            });
          });
        } else {
          var serverUrl = "https://dagala.cfapps.io/api/1/createGame";
          $http.post(serverUrl, $rootScope.battle.gameId + "," + id).success(function (data, status, headers, config) {
            $rootScope.goToGame(url, data);
          }).catch(function (err) {
            menuService.stopLoading();
            menuService.myHandleError(err);
            renderRoot();
          });
        }
      }
    };
    $scope.topRanks = function (id) {
      index = null;
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/records", id + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
        $scope.ranks = data;
        menuService.stopLoading();
        $ionicModal.fromTemplateUrl('ranks.html', {
          scope: $scope
        }).then(function (modal) {
          $rootScope.modal = modal;
          modal.show();
        });
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.ranksBack = function () {
      $rootScope.modal.hide();
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('InvitationCtrl', function ($scope, $state, $ionicHistory, $http, $rootScope, menuService) {
    $scope.username;
    $scope.submit = function () {
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/inviteFriend", $("#username").val()+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data == "404") {
          menuService.myMessage("نام کاربری اشتباه می باشد")
        } else if (data == "200") {
          menuService.myMessage("امتیاز معرف شما ثبت شد")
        }
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('LeagueCtrl', function ($scope, $state, $ionicHistory, $http, $rootScope, menuService, $timeout, $ionicModal) {
    $scope.$on("$ionicView.beforeEnter", function (scopes, states) {
      $scope.loaded = false;
    });
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        menuService.startLoading();
        $http.post("https://dagala.cfapps.io/api/1/availableLeague",$rootScope.gamer.user).success(function (data, status, headers, config) {
          menuService.stopLoading();
          $scope.leagues = data;
          angular.forEach($scope.leagues, function(member, index){
            member.i = index;
          });
          $scope.loaded = true;
          menuService.leagueTutorial();
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      }, 700)
    });
    $scope.prices = function (index) {
      $scope.p = $scope.leagues[index].prizes;
      $ionicModal.fromTemplateUrl('price.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.modal = modal;
        modal.show();
      });
    };
    $scope.help = function () {
      menuService.leagueHelp();
    };
    $scope.joinLeague = function (row) {
      if ($rootScope.gamer.gem < row.cost){
        menuService.myMessage("الماس شما برای ورود به این لیگ کافی نیست", "خطا");
        return;
      }
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/requestLeague", row.id+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data == 200) {
          $rootScope.gamer.gem -= row.cost;
          menuService.myMessage("شما با موفقیت عضو این لیگ شدید", "پیام");
          row.status = 3;
        } else if (data == 201) {
          menuService.myMessage("ظرفیت این لیگ تکمیل شده و امکان ثبت نام نیست", "خطا");
        } else if (data == 202) {
          menuService.myMessage("لیگ شروع شده و امکان ثبت نام نیست", "خطا");
          row.status = 2;
        }
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.playLeague = function (id) {
      $rootScope.leagueId = id;
      $state.go("battlefield");
    };
    $scope.tops = function (id) {
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/finishedLeague", id).success(function (data, status, headers, config) {
        $scope.ranks = {
          users: data,
          user: null
        };
        menuService.stopLoading();
        $ionicModal.fromTemplateUrl('ranks.html', {
          scope: $scope
        }).then(function (modal) {
          $rootScope.modal = modal;
          modal.show();
        });
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.ranksBack = function () {
      $rootScope.modal.hide();
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
      $http.post("https://dagala.cfapps.io/api/1/rouletteWheel", value+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        if (data == "200") {
          $rootScope.gamer.coins += (value + 1);
        } else {
          menuService.myMessage("شما سهمیه امروز خود را دریافت کردید", "خطا");
        }
      }).catch(function (err) {
        menuService.myHandleError(err);
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('CoiningCtrl', function ($scope, $state, $ionicHistory, menuService, $ionicModal, $rootScope, $http,$timeout) {
    $timeout(function () {
      menuService.coiningTutorial();
    },700);
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    $scope.wheel = function () {
      $state.go("wheel");
    };
    $scope.invitation = function () {
      $state.go("invitation");
    };
    $scope.help = function () {
      menuService.coiningHelp();
    };
    $scope.tapsell = function () {
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/videoLimit").success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data == "201"){
          menuService.myMessage("در هر ساعت می توانید فقط یک ویدیو تماشا کنید", "خطا");
        } else {
          tapsell.requestAd(null, false, function (result) {
            if (result['action'] == 'onAdAvailable') {
              tapsell.showAd(result['adId'], true, true, tapsell_rotation_unlocked, true);
              tapsell.setRewardCallback(function (result) {
                if (result['action'] == 'onAdShowFinished') {
                  if (result['completed'] && result['rewarded']) {
                    $http.post("https://dagala.cfapps.io/api/1/videoWatch",$rootScope.gamer.user).success(function (data, status, headers, config) {
                      $rootScope.gamer.coins += 30;
                      menuService.myMessage("30 سکه به شما تعلق گرفت", "پیام");
                    }).catch(function (err) {
                      menuService.myHandleError(err);
                    });
                  }
                }
              });
            }
            else if (result['action'] == 'onNoAdAvailable') {
              menuService.myMessage("تبلیغی برای نمایش وجود ندارد", "خطا");
            }
            else if (result['action'] == 'onNoNetwork') {
              menuService.myMessage("لطفا اتصال اینترنت خود را بررسی کنید", "خطا");
            }
            else if (result['action'] == 'onError') {
              menuService.myMessage("خطا در دریافت ویدیو", "خطا");
            }
            else if (result['action'] == 'onExpiring') {
              menuService.myMessage("این تبلیغ منقضی شده است", "خطا");
            }
          });
        }
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.buy = function () {
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/marketObjects").success(function (data, status, headers, config) {
        $scope.rows = data;
        menuService.stopLoading();
        $ionicModal.fromTemplateUrl('buy.html', {
          scope: $scope
        }).then(function (modal) {
          $rootScope.modal = modal;
          modal.show();
        });
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.doBuy = function (productId,price) {
      $rootScope.modal.hide();
      if ($rootScope.isAndroid()) {
        inappbilling.buy(function (data) {
          $http.post("https://dagala.cfapps.io/api/1/inventory", productId+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
            inappbilling.consumePurchase(function () {
              menuService.myMessage("خرید شما با موفقیت انجام شد", "پیام");
            }, function (e) {
              menuService.myMessage("خرید مجدد این محصول برای شما ممکن نخواهد بود، بدلیل خطای کافه بازار.برای رفع مشکل با ما تماس بگیرید", "خطا");
            }, productId)
          }).catch(function (err) {
            menuService.myHandleError(err);
          });
        }, function (e) {
          menuService.myMessage("خطا در برقراری ارتباط با کافه بازار", "خطا");
        },productId)
      } else {
        menuService.startLoading();
        var url = "https://dagala.cfapps.io/api/1/factor";
        $http.post(url, price+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
          menuService.stopLoading();
          window.open(
            "http://dagala.ir/bank.html?res=" + data + "&amount=" + price ,
            "_system",
            "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
          );
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      }
    }
  })
  .controller('BattlefieldCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $interval) {
    $scope.loaded = false;
    var url;
    var param;
    function loadData(refresh) {
      if ($rootScope.isLeague) {
        url = "https://dagala.cfapps.io/api/1/detailLeague";
        param = $rootScope.leagueId;
      } else {
        url = "https://dagala.cfapps.io/api/1/detailGame";
        param = $rootScope.rowId;
      }
      $http.post(url, param+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        if (!$rootScope.isEnded) {
          processTiming(data)
        } else {
          showResults(data);
        }
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      });
    }

    function processTiming(data) {
      if ($rootScope.isEnded) {
        showResults(data);
      } else {
        if (data.timeLeft != null && data.timeLeft <= 0) {
          callTimeoutService(data);
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
                  callTimeoutService(data);
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

    function callTimeoutService(data1) {
      $http.post("https://dagala.cfapps.io/api/1/timeOut", data1.gameId+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        data.pass = $rootScope.gamer.pass;
        data.token = $rootScope.gamer.token;
        $rootScope.saveGamer(data);
        $rootScope.timedOut = true;
        $state.go("home");
        menuService.stopLoading();
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    }
    var refreshInterval;
    $scope.$on("$ionicView.beforeEnter", function (scopes, states) {
      $('#clock').css("display", "none");
      $scope.loaded = false;
    });
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        menuService.startLoading();
        loadData(false);
      }, 700);
      refreshInterval = $interval(function () {
        loadData(false);
      }, 60000);
    });
    $scope.$on('$ionicView.leave', function () {
      $interval.cancel(refreshInterval);
    });
    $scope.help = function () {
      menuService.battlefieldHelp();
    };
    $scope.play = function () {
      if ($rootScope.battle.url && $rootScope.battle.status == "1") {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.gameDTOS[$rootScope.battle.gameDTOS.length - 1].challengeId+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      } else if ($rootScope.battle.url && $rootScope.battle.status == "3") {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.url+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      } else if ($rootScope.battle.status == "10" || (!$rootScope.battle.url && $rootScope.battle.status == "1")) {
        $rootScope.isTrain = false;
        $state.go("board");
      }
    };
    $scope.dontPlay = function () {
      if ($rootScope.battle.user.user == null) {
        menuService.myMessage("هنوز حریفی برای شما انتخاب نشده");
      } else {
        menuService.myMessage("نوبت حریفته، بازیش که تموم شد نوبت تو میشه");
      }
    };
    $scope.taslim = function () {
      menuService.startLoading();
      var url = "https://dagala.cfapps.io/api/1/stopGame";
      $http.post(url, $rootScope.battle.gameId+","+$rootScope.gamer.user).success(function (data, status, headers, config) {
        data.pass = $rootScope.gamer.pass;
        data.token = $rootScope.gamer.token;
        $rootScope.saveGamer(data);
        menuService.stopLoading();
        $state.go("home");
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.refresh = function () {
      loadData(true);
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('NewgameCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $ionicPopup) {
    function loadData(refresh) {
      var url = "https://dagala.cfapps.io/api/1/requestGame";
      $http.post(url,$rootScope.gamer.user).success(function (data, status, headers, config) {
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
        menuService.stopLoading();
        menuService.myHandleError(err);
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
          menuService.newGameTutorial();
        } else {
          $scope.loaded = true;
        }
      }, 700)
    });
    $scope.help = function () {
      menuService.newGameHelp();
    };
    $scope.play = function () {
      if ($rootScope.battle.second != null) {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.challengeList[$rootScope.battle.challengeList.length - 1].id).success(function (data, status, headers, config) {
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
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
          {
            text: '<span class="myText">بله</span>',
            onTap: function (e) {
              var serverUrl = "https://dagala.cfapps.io/api/1/cancelRequest";
              $http.post(serverUrl, $rootScope.battle.gameId).success(function (data, status, headers, config) {
              }).catch(function (err) {
                menuService.myHandleError(err);
              });
              $ionicHistory.goBack();
            }
          },
          {text: '<span class="myText">نه</span>'}
        ]
      });
    };
  })
  .controller('LoginCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory) {
    $scope.username;
    $scope.pass;
    $scope.doLogin = function () {
      var username = $("#username").val();
      var pass = $("#pass").val();
      menuService.startLoading();
      delete $http.defaults.headers.common.Authorization;
      var url = "https://dagala.cfapps.io/api/1/user_authenticate";
      var d = {
        username: username,
        password: pass,
        rememberMe: true
      };
      $http.post(url, d).success(function (data, status, headers, config) {
        $http.defaults.headers.common.Authorization = data.token;
        data.pass = d.password;
        data.user = d.username;
        $rootScope.saveGamer(data);
        menuService.stopLoading();
        $state.go("home");
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err, true);
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('RanksCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory, $timeout) {
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        menuService.startLoading();
        $http.post("https://dagala.cfapps.io/api/1/topPlayer",$rootScope.gamer.user).success(function (data, status, headers, config) {
          $scope.ranks = data;
          menuService.stopLoading();
          menuService.ranksTutorial();
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      }, 700);
    });
    $scope.ranksBack = function () {
      $ionicHistory.goBack();
    };
  })
  .controller('ForgetCtrl', function ($scope, $state, menuService, $http, $ionicHistory) {
    $scope.submit = function (username) {
      menuService.startLoading();
      var signUpUrl = "https://dagala.cfapps.io/api/1/forget";
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
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
    };
    $scope.confirm = function (code, password) {
      var signUpUrl = "https://dagala.cfapps.io/api/1/confirmReset";
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
          menuService.stopLoading();
          menuService.myHandleError(err);
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
    $scope.username;
    $scope.pass;
    $scope.tel;
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
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  });

