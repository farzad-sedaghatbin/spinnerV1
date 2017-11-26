'use strict';
angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope, $state, $ionicModal, $rootScope, menuService, $http, $ionicPopup, $timeout) {
    $rootScope.homeURL = window.location.href;
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $rootScope.sendToServer();
      if ($rootScope.timedOut) {
        $rootScope.timedOut = false;
        $rootScope.checkLevel(true);
      }
    });


    $rootScope.isMute = false;
    $scope.speaker = function () {
      if ($rootScope.isMute) {
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="mute"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["mute", false]);
          });
        });
        $rootScope.myAudio.play({ numberOfLoops: 9999 });
        $("#speaker").attr("src", "img/speaker.png");
        $rootScope.isMute = false;
      } else {
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="mute"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["mute", true]);
          });
        });
        $rootScope.myAudio.pause();
        $("#speaker").attr("src", "img/mute.png");
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
      $http.post(serverUrl, url + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
        $rootScope.saveGamer($rootScope.gamer);
      }).catch(function (err) {
        menuService.myHandleError(err);
      });
    };
    $scope.refresh = function () {
      $rootScope.refreshGamer(true, $scope);
    };
    function innerChallenge() {
      if ($rootScope.gamer.coins < $rootScope.gamer.perGameCoins) {
        menuService.myMessage("سکه های شما کافی نیست. برای بدست آوردن سکه، به قسمت سکه در منو مراجعه کنید", "خطا");
        return;
      }
      if ($rootScope.gamer.halfGame.length >= 10) {
        menuService.myMessage("شما به سقف تعداد بازی نیمه تمام رسیده اید", "خطا");
        return;
      }
      $state.go("select");
    }
    $scope.doChallenge = function () {
      if (!$rootScope.gamer){
        menuService.startLoading();
        $http.post("https://dagala.cfapps.io/api/1/tempUser").success(function (data, status, headers, config) {
          $http.defaults.headers.common['Authorization'] = data.token;
          data.pass = data.user;
          $rootScope.saveGamer(data);
          menuService.stopLoading();
          innerChallenge();
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err, false);
        });
      } else {
        innerChallenge();
      }
    };
    $scope.challenge = function () {
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="wasInGame"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (results.rows && results.rows.length !== 0) {
            $rootScope.sendToServer();
            $scope.doChallenge();
          } else {
            $scope.doChallenge();
          }
        })
      });
    };
    $scope.soon = function () {
      menuService.myMessage("خبرهای جالبی تو راهه");
    };
    $scope.ranks = function () {
      $rootScope.selectedGame = null;
      $state.go("ranks");
    };
    $scope.register = function () {
      $state.go("profile")
    };
    $scope.changePass = function () {
      $state.go("login")
    };
    $scope.coining = function () {
      $state.go("coining");
    };
    $scope.league = function () {
      $rootScope.isEnded = false;
      $rootScope.isLeague = true;
      $rootScope.isTrain = false;
      $state.go("league");
    };
    $scope.training = function () {
      menuService.resetPlayedGames();
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
    $scope.goToBattlefield = function (gameId, isEnded) {
      $rootScope.rowId = gameId;
      $rootScope.isEnded = isEnded;
      $rootScope.isLeague = false;
      $state.go("battlefield");
    };
    $scope.battlefield = function (gameId, isEnded) {
      menuService.getDb().transaction(function (tx) {
        tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="wasInGame"', [], function (tx, results) {
          var len = results.rows.length, i, result = '';
          if (results.rows && results.rows.length !== 0) {
            $rootScope.sendToServer();
            $scope.goToBattlefield(gameId, isEnded);
          } else {
            $scope.goToBattlefield(gameId, isEnded);
          }
        })
      });
    };
    $scope.toggleHalfs = function () {
      if ($rootScope.halfs) {
        $rootScope.halfs = false;
        $(".myhalfs").hide("slow");
        $("#halfIcon").css("background", "url(img/hide.png) no-repeat center").css("background-size", "contain");
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="halfs"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["halfs", true]);
          });
        });
      } else {
        $rootScope.halfs = true;
        $(".myhalfs").show("slow");
        $("#halfIcon").css("background", "url(img/2-natije-2.png) no-repeat right").css("background-size", "contain");
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="halfs"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["halfs", false]);
          });
        });
      }
    };
    $scope.toggleEnds = function () {
      if ($rootScope.ends) {
        $rootScope.ends = false;
        $(".myends").hide("slow");
        $("#endIcon").css("background", "url(img/hide.png) no-repeat center").css("background-size", "contain");
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="ends"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["ends", true]);
          });
        });
      } else {
        $rootScope.ends = true;
        $(".myends").show("slow");
        $("#endIcon").css("background", "url(img/2-natije-2.png) no-repeat right").css("background-size", "contain");
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM MYGAME WHERE name="ends"', [], function (tx, results) {
            tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["ends", false]);
          });
        });
      }
    };
    $scope.$on("$ionicView.loaded",function () {
      $timeout(function () {
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="halfs"', [], function (tx, results) {
            var len = results.rows.length, i, result = '';
            if (!results.rows || results.rows.length == 0) {
              $rootScope.halfs = false;
            } else {
              $rootScope.halfs = results.rows.item(0).val === true || results.rows.item(0).val === "true";
            }
            $scope.toggleHalfs();
          }, null);
        });
        menuService.getDb().transaction(function (tx) {
          tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="ends"', [], function (tx, results) {
            var len = results.rows.length, i, result = '';
            if (!results.rows || results.rows.length == 0) {
              $rootScope.ends = false;
            } else {
              $rootScope.ends = results.rows.item(0).val === true || results.rows.item(0).val === "true";
            }
            $scope.toggleEnds();
          }, null);
        });
      },600);
    });
    $timeout(function () {
      menuService.homeTutorial();
    }, 700);
  })
  .controller('BoardCtrl', function ($scope, $timeout, $ionicHistory, menuService, $http, $rootScope, $state, $ionicModal, $ionicPopup) {
    var root = true;
    $timeout(function () {
      menuService.boardTutorial();
    }, 700);
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
              {menuicon: '', adr: 'javascript:;', text: 'مهارتی', style: {"font-size": "large"}, id: 2, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'پرشی', style: {"font-size": "large"}, id: 3, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'ورزشی', style: {"font-size": "large"}, id: 4, style2: false}
            ]
          };
        } else if (!$rootScope.newMenu) {
          $rootScope.newMenu = [];
          var arr = [];
          while (arr.length < 2) {
            var randomnumber = Math.floor(Math.random() * 4) + 1;
            if (arr.indexOf(randomnumber) > -1) continue;
            arr[arr.length] = randomnumber;
          }
          $scope.config = {
            status: true,
            submenus: [
              {menuicon: '', adr: 'javascript:;', text: 'فکری', style: {"font-size": "large"}, id: 1, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'مهارتی', style: {"font-size": "large"}, id: 2, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'پرشی', style: {"font-size": "large"}, id: 3, style2: false},
              {menuicon: '', adr: 'javascript:;', text: 'ورزشی', style: {"font-size": "large"}, id: 4, style2: false}
            ]
          };
          angular.forEach($scope.config.submenus, function (member, index) {
            if (arr.indexOf(member.id) > -1) {
              $rootScope.newMenu.push(member);
            }
          });
          $scope.config.submenus = $rootScope.newMenu;
        } else {
          $scope.config = {
            status: true,
            submenus: $rootScope.newMenu
          };
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
              if ($rootScope.gamer.coins < 60) {
                menuService.myMessage("سکه های شما برای آزاد کردن دسته بندی ها کافی نیست", "خطا");
                return;
              }
              menuService.startLoading();
              $http.post("https://dagala.cfapps.io/api/1/expandMenu", $rootScope.gamer.user).success(function (data, status, headers, config) {
                menuService.stopLoading();
                $scope.config.submenus = [
                  {
                    menuicon: '',
                    adr: 'javascript:;',
                    text: 'فکری',
                    style: {"font-size": "large"},
                    id: 1,
                    style2: false
                  },
                  {
                    menuicon: '',
                    adr: 'javascript:;',
                    text: 'مهارتی',
                    style: {"font-size": "large"},
                    id: 2,
                    style2: false
                  },
                  {
                    menuicon: '',
                    adr: 'javascript:;',
                    text: 'پرشی',
                    style: {"font-size": "large"},
                    id: 3,
                    style2: false
                  },
                  {
                    menuicon: '',
                    adr: 'javascript:;',
                    text: 'ورزشی',
                    style: {"font-size": "large"},
                    id: 4,
                    style2: false
                  }
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
        $("#title").text("دسته بندی");
      }

    };
    var index = null;
    var text;
    $scope.menufun = function (s, id, url) {
      if (root) {
        switch (id) {
          case 1:
            $scope.config.submenus = [{
              menuicon: 'img/puzzle.png',
              adr: 'puzzle/www.gameeapp.com/game/FGM7TVW2Ma.html',
              text: '',
              style: {"font-size": "large"},
              id: 5,
              style2: $.inArray('img/puzzle.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/hexo.png',
              adr: 'hexon/www.gameeapp.com/game/xRkQk0iwI3.html',
              text: '',
              style: {"font-size": "large"},
              id: 7,
              style2: $.inArray('img/hexo.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/diamond.png',
              adr: 'diamond/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 10,
              style2: $.inArray('img/diamond.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/hegza.png',
              adr: 'hegza/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 11,
              style2: $.inArray('img/hegza.png', menuService.getPlayedGames()) > -1
            }];
            text = "فکری";
            break;
          case 2:
            $scope.config.submenus = [{
              menuicon: 'img/spinner.png',
              adr: 'spinner/www.gameeapp.com/game/ipUMpcUES.html',
              text: '',
              style: {"font-size": "large"},
              id: 2,
              style2: $.inArray('img/spinner.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/mr.png',
              adr: 'mr/www.gameeapp.com/game/WmHdqig.html',
              text: '',
              style: {"font-size": "large"},
              id: 8,
              style2: $.inArray('img/mr.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/orbit.png',
              adr: 'orbit/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 12,
              style2: $.inArray('img/orbit.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/school.png',
              adr: 'school/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 13,
              style2: $.inArray('img/school.png', menuService.getPlayedGames()) > -1
            }];
            text = "مهارتی";
            break;
          case 3:
            $scope.config.submenus = [{
              menuicon: 'img/ninja.png',
              adr: 'ninja/www.gameeapp.com/game/G1oy49taR.html',
              text: '',
              style: {"font-size": "large"},
              id: 3,
              style2: $.inArray('img/ninja.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/space.png',
              adr: 'space/www.gameeapp.com/game/ibBTDViUP.html',
              text: '',
              style: {"font-size": "large"},
              id: 1,
              style2: $.inArray('img/space.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/qubo.png',
              adr: 'qubo/www.gameeapp.com/game/u0yXP5o.html',
              text: '',
              style: {"font-size": "large"},
              id: 9,
              style2: $.inArray('img/qubo.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/tire.png',
              adr: 'tire/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 14,
              style2: $.inArray('img/tire.png', menuService.getPlayedGames()) > -1
            }];
            text = "پرشی";
            break;
          case 4:
            $scope.config.submenus = [{
              menuicon: 'img/motor.png',
              adr: 'motor/www.gameeapp.com/game/kAHVRl.html',
              text: '',
              style: {"font-size": "large"},
              id: 4,
              style2: $.inArray('img/motor.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/car.png',
              adr: 'car/www.gameeapp.com/game/oFfW2omiW.html',
              text: '',
              style: {"font-size": "large"},
              id: 6,
              style2: $.inArray('img/car.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/football.png',
              adr: 'football/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 15,
              style2: $.inArray('img/football.png', menuService.getPlayedGames()) > -1
            },{
              menuicon: 'img/karate.png',
              adr: 'karate/gamee/game/index.html',
              text: '',
              style: {"font-size": "large"},
              id: 16,
              style2: $.inArray('img/karate.png', menuService.getPlayedGames()) > -1
            }];
            text = "ورزشی";
            break;
        }
        root = false;
        var myEl = angular.element(document.querySelector('.m'));
        myEl.toggleClass("active");
        $timeout(function () {
          myEl.toggleClass('omid');
        }, 100);
        if (!$rootScope.isTrain) {
          $("#release").css("display", "none");
        }
        $("#title").text(text);
      } else {
        if ($rootScope.isTrain) {
          if (index === null) {
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
            if (s !== index) {
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
          gooyi(58, 49, 10, 70);
          break;
        case 1:
          gooyi(35, -42, -25, -36);
          break;
        case 2:
          gooyi(35, -42, -25, -36);
          break;
        case 3:
          gooyi(-38, 48, 10, 72);
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
    function innerStart(id, url) {
      menuService.startLoading();
      if ($rootScope.isLeague && $rootScope.battle.status === "10") {
        $http.post("https://dagala.cfapps.io/api/1/createLeagueGame", $rootScope.leagueId + "," + id + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
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
              tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["score", "true," + id + "," + $rootScope.gamer.token + ",0," + $rootScope.homeURL + "," + $rootScope.gamer.user], function (tx, results) {
                $rootScope.changeUrl(url,false);
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
    }
    $scope.start = function (id, url) {
      if (!$rootScope.gamer){
        menuService.startLoading();
        $http.post("https://dagala.cfapps.io/api/1/tempUser").success(function (data, status, headers, config) {
          $http.defaults.headers.common['Authorization'] = data.token;
          data.pass = data.user;
          $rootScope.saveGamer(data);
          menuService.stopLoading();
          innerStart(id, url);
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err, false);
        });
      } else {
        innerStart(id, url);
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
      $http.post("https://dagala.cfapps.io/api/1/inviteFriend", $("#username").val() + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data === "404") {
          menuService.myMessage("نام کاربری اشتباه می باشد", "خطا");
        } else if (data === "200") {
          menuService.myMessage("امتیاز شما و معرف شما ثبت شد");
          $rootScope.gamer.coins += 150;
        } else if (data === "333"){
          menuService.myMessage("شما حداکثر 3 تا از دوستانتون رو میتونید معرفی کنید", "خطا");
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
    function loadData(refresh) {
      $http.post("https://dagala.cfapps.io/api/1/availableLeague", $rootScope.gamer.user).success(function (data, status, headers, config) {
        menuService.stopLoading();
        $scope.leagues = data;
        angular.forEach($scope.leagues, function (member, index) {
          member.i = index;
        });
        $scope.loaded = true;
        menuService.leagueTutorial();
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
        if (refresh)
          $scope.$broadcast('scroll.refreshComplete');
      });
    }

    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        if (!$rootScope.gamer){
          menuService.startLoading();
          $http.post("https://dagala.cfapps.io/api/1/tempUser").success(function (data, status, headers, config) {
            $http.defaults.headers.common['Authorization'] = data.token;
            data.pass = data.user;
            $rootScope.saveGamer(data);
            loadData(false);
          }).catch(function (err) {
            menuService.stopLoading();
            menuService.myHandleError(err, false);
          });
        } else {
          menuService.startLoading();
          loadData(false);
        }
      }, 700)
    });
    $scope.refresh = function () {
      loadData(true);
    };
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
      if ($rootScope.gamer.gem < row.cost) {
        menuService.myMessage("الماس شما برای ورود به این لیگ کافی نیست", "خطا");
        return;
      }
      if ($rootScope.gamer.level < row.minLevel) {
        menuService.myMessage("سطح شما از حداقل سطح لازم برای این لیگ پایین تر است", "خطا");
        return;
      }
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/requestLeague", row.id + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data === 200) {
          $rootScope.gamer.gem -= row.cost;
          menuService.myMessage("شما با موفقیت عضو این لیگ شدید", "پیام");
          row.status = 1;
        } else if (data === 201) {
          menuService.myMessage("ظرفیت این لیگ تکمیل شده و امکان ثبت نام نیست", "خطا");
        } else if (data === 202) {
          menuService.myMessage("لیگ شروع شده و امکان ثبت نام نیست", "خطا");
          row.status = 2;
        }
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    };
    $scope.waitForLeague = function () {
      menuService.myMessage("شما در این لیگ عضو هستید. منتظر شروع شدن آن باشید", "خطا");
    };
    $scope.leagueStarted = function () {
      menuService.myMessage("لیگ شروع شده ولی شما در آن عضو نیستید", "خطا");
    };
    $scope.playLeague = function (id) {
      $rootScope.leagueId = id;
      $rootScope.isEnded = false;
      $rootScope.isLeague = true;
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
  .controller('WheelCtrl', function ($scope, $state, $ionicHistory, menuService, $http, $rootScope,$timeout) {
    var wasHit;
    $scope.$on("$ionicView.beforeEnter", function (scopes, states) {
      wasHit = false;
    });
    $scope.spin = function () {
      if (wasHit)
        return;
      wasHit = true;
      var count = $(".triangle").length;
      var $spinner = $(".spinneromid");
      var value = parseInt(Math.random() * count);
      var preffix = "index-";
      $spinner.toggleClass("spin");
      $spinner[0].className = $spinner[0].className.replace(
        new RegExp("(^|\\s)" + preffix + "\\S+", "g"),
        ""
      );
      $spinner.addClass(preffix + value);
      $http.post("https://dagala.cfapps.io/api/1/rouletteWheel", value + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
        $rootScope.gamer.coins += data;
        $timeout(function () {
          if (data) {
            if (data >= 0) {
              menuService.myMessage(data + " سکه دریافت کردید", "پیام");
            } else {
              menuService.myMessage(Math.abs(data) + " سکه از شما کم شد", "پیام");
            }
          } else {
            menuService.myMessage("شما سهمیه امروز خود را دریافت کردید", "خطا");
          }
        },2500);
      }).catch(function (err) {
        menuService.myHandleError(err);
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('CoiningCtrl', function ($scope, $state, $ionicHistory, menuService, $ionicModal, $rootScope, $http, $timeout) {
    $timeout(function () {
      menuService.coiningTutorial();
    }, 700);
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
      $http.post("https://dagala.cfapps.io/api/1/videoLimit",$rootScope.gamer.user).success(function (data, status, headers, config) {
        menuService.stopLoading();
        if (data === 201) {
          menuService.myMessage("در هر ساعت می توانید فقط یک ویدیو تماشا کنید", "خطا");
        } else {
          tapsell.requestAd(null, false, function (result) {
            if (result['action'] === 'onAdAvailable') {
              tapsell.showAd(result['adId'], true, true, tapsell_rotation_unlocked, true);
              tapsell.setRewardCallback(function (result) {
                if (result['action'] === 'onAdShowFinished') {
                  if (result['completed'] && result['rewarded']) {
                    $http.post("https://dagala.cfapps.io/api/1/videoWatch", $rootScope.gamer.user).success(function (data, status, headers, config) {
                      $rootScope.gamer.coins += 20;
                      menuService.myMessage("20 سکه به شما تعلق گرفت", "پیام");
                    }).catch(function (err) {
                      menuService.myHandleError(err);
                    });
                  }
                }
              });
            }
            else if (result['action'] === 'onNoAdAvailable') {
              menuService.myMessage("تبلیغی برای نمایش وجود ندارد", "خطا");
            }
            else if (result['action'] === 'onNoNetwork') {
              menuService.myMessage("لطفا اتصال اینترنت خود را بررسی کنید", "خطا");
            }
            else if (result['action'] === 'onError') {
              menuService.myMessage("خطا در دریافت ویدیو", "خطا");
            }
            else if (result['action'] === 'onExpiring') {
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
    $scope.doBuy = function (productId, price, icon, amount,id,isCoin) {
      $rootScope.modal.hide();
      if (isCoin){
        if ($rootScope.gamer.coins < price){
          menuService.myMessage("سکه های شما کافی نیست", "خطا");
          return;
        }
        menuService.startLoading();
        $http.post("https://dagala.cfapps.io/api/1/inventory", productId + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
          data.pass = $rootScope.gamer.pass;
          data.token = $rootScope.gamer.token;
          $rootScope.saveGamer(data);
          menuService.myMessage("خرید شما با موفقیت انجام شد", "پیام");
          menuService.stopLoading();
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      } else if ($rootScope.isAndroid()) {
        inappbilling.buy(function (data) {
          $http.post("https://dagala.cfapps.io/api/1/inventory", productId + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
            inappbilling.consumePurchase(function () {
              menuService.myMessage("خرید شما با موفقیت انجام شد", "پیام");
              if (icon.indexOf("coin") >= 0) {
                $rootScope.gamer.coins += amount;
              } else if (icon.indexOf("gem") >= 0) {
                $rootScope.gamer.gem += amount;
              }
            }, function (e) {
              menuService.myMessage("خرید مجدد این محصول برای شما ممکن نخواهد بود، بدلیل خطای کافه بازار.برای رفع مشکل با ما تماس بگیرید", "خطا");
            }, productId)
          }).catch(function (err) {
            menuService.myHandleError(err);
          });
        }, function (e) {
          menuService.myMessage("خطا در برقراری ارتباط با کافه بازار", "خطا");
        }, productId)
      } else {
        menuService.startLoading();
        var url = "https://dagala.cfapps.io/api/1/factor";
        $http.post(url, price + "," + $rootScope.gamer.user + "," + id).success(function (data, status, headers, config) {
          menuService.stopLoading();
          window.open(
            "http://dagala.ir/bank.html?res=" + data + "&amount=" + parseInt(price) * 10,
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
  .controller('BattlefieldCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $interval,$ionicModal) {
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
      $http.post(url, param + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
        if ($rootScope.isLeague && data.timeLeft === null)
          $rootScope.isEnded = true;
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
      if (data.timeLeft !== null && data.timeLeft <= 0) {
        callTimeoutService(data);
      } else {
        if (data.status === "2" || data.status === null) {
          $scope.myTurn = "";
          $scope.hisTurn = "نوبتشه";
        } else {
          $scope.myTurn = "نوبتته";
          $scope.hisTurn = "";
        }
        showResults(data);
        if (data.timeLeft !== null) {
          var clock = new FlipClock($('.clock'), data.timeLeft, {
            clockFace: 'SecondCounter',
            autoStart: true,
            countdown: true,
            callbacks: {
              stop: function () {
                menuService.startLoading();
                callTimeoutService(data);
              },
              start: function () {
                $('.clock').css("display", "block");
              }
            }
          });
        }
        menuService.resetPlayedGames();
        angular.forEach(data.gameDTOS, function (member, index) {
          menuService.addPlayedGames(member.icon);
        });
      }
    }

    function showResults(data) {
      $rootScope.battle = data;
      menuService.stopLoading();
      $scope.loaded = true;
      $timeout(function () {
        var scores = $(".score");
        angular.forEach(scores, function (member, index) {
          if(member.innerText && member.innerText.length > 4){
            $(member).css("font-size","large");
          }
        });
      },1000);
      showStickers(data.messages)
    }

    function showStickers(stickers) {
      if (stickers.length > 0){
        var popped = stickers.pop();
        var img = $('<img id="dynamic">');
        img.attr('src', popped);
        img.appendTo('#myContent');
        img.css("width","72px").css("height","72px").css("position","absolute").css("top","200px").css("right","20px").css("animation-duration","4s").css("-webkit-animation-duration","4s");
        img.addClass("animated bounceOutLeft");
        img.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
          img.remove();
          showStickers(stickers);
        });
      }
    }

    function callTimeoutService(data1) {
      $http.post("https://dagala.cfapps.io/api/1/timeOut", data1.gameId + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
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
      $('.clock').css("display", "none");
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
    $scope.$on('$ionicView.beforeLeave', function () {
      $interval.cancel(refreshInterval);
      $('.clock').css("display", "none");
    });
    $scope.help = function () {
      menuService.battlefieldHelp();
    };
    $scope.play = function () {
      if ($rootScope.battle.url && $rootScope.battle.status === "1") {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.gameDTOS[$rootScope.battle.gameDTOS.length - 1].challengeId + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
          if (!data.lastUrl){
            menuService.myMessage("این بازی تمام شده است","خطا");
            $rootScope.refreshGamer(false,null);
            menuService.stopLoading();
            return;
          }
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      } else if ($rootScope.battle.url && $rootScope.battle.status === "3") {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.url + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
          if (!data.lastUrl){
            menuService.myMessage("این بازی تمام شده است","خطا");
            $rootScope.refreshGamer(false,null);
            menuService.stopLoading();
            return;
          }
          $rootScope.goToGame(data.lastUrl, data.challengeId)
        }).catch(function (err) {
          menuService.stopLoading();
          menuService.myHandleError(err);
        });
      } else if ($rootScope.battle.status === "10" || (!$rootScope.battle.url && $rootScope.battle.status === "1")) {
        $rootScope.isTrain = false;
        $state.go("board");
      }
    };
    $scope.dontPlay = function () {
      if ($rootScope.battle.user.user === null) {
        menuService.myMessage("هنوز حریفی برای شما انتخاب نشده");
      } else {
        menuService.myMessage("نوبت حریفته، بازیش که تموم شد نوبت تو میشه");
      }
    };
    $scope.taslim = function () {
      menuService.startLoading();
      var url = "https://dagala.cfapps.io/api/1/stopGame";
      $http.post(url, $rootScope.battle.gameId + "," + $rootScope.gamer.user).success(function (data, status, headers, config) {
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
    $scope.selectStickers = function () {
      $ionicModal.fromTemplateUrl('stickers.html', {
        scope: $scope
      }).then(function (modal) {
        $rootScope.modal = modal;
        modal.show();
      });
    };
    $scope.loadChatbox = function(){var e=document.getElementById("maxi-chat");e.style.display="none";var e=document.getElementById("chatbox");e.style.margin="0";}
    $scope.closeChatbox = function(){var e=document.getElementById("chatbox");e.style.margin="0 0 -1500px 0";}
    $scope.minimChatbox = function(){var e=document.getElementById("maxi-chat");e.style.display="block";var e=document.getElementById("chatbox");e.style.margin="0 0 -460px 0";}

    $scope.selected = function (pre,id) {
      var el = $('#' + pre + id);
      el.addClass('animated bounceOutRight');
      el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        el.removeClass("animated bounceOutRight").addClass('animated bounceIn');
      });
    };
    $scope.refresh = function () {
      loadData(true);
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
  })
  .controller('NewgameCtrl', function ($scope, $state, $ionicHistory, menuService, $timeout, $http, $rootScope, $ionicPopup) {
    function loadData(refresh) {
      var url = "https://dagala.cfapps.io/api/1/requestGame";
      $http.post(url, $rootScope.gamer.user).success(function (data, status, headers, config) {
        $rootScope.battle = data;
        if ($rootScope.battle.second !== null && $rootScope.battle.second.user === $rootScope.gamer.user) {
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
      if ($rootScope.battle.second !== null) {
        menuService.startLoading();
        var serverUrl = "https://dagala.cfapps.io/api/1/joinGame";
        $http.post(serverUrl, $rootScope.battle.gameId + "," + $rootScope.battle.challengeList[$rootScope.battle.challengeList.length - 1].id).success(function (data, status, headers, config) {
          if (!data.lastUrl){
            menuService.myMessage("این بازی تمام شده است","خطا");
            $rootScope.refreshGamer(false,null);
            return;
          }
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
    $scope.isLogin = true;
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $scope.isLogin = true;
    });
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
    $scope.forgetPass = function () {
      $state.go("forget")
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    };
    var tab;
    $scope.switch = function () {
      if ($scope.isLogin) {
        $("#main").css("background", "url('img/register-body-form.png')");
        tab = $("#tab");
        tab.css("background", "url('img/LOGIN-OFFLINE.png')");
        tab.css("left", "20%");
        $scope.isLogin = false;
      } else {
        $("#main").css("background", "url('img/login-body-form.png')");
        tab = $("#tab");
        tab.css("background", "url('img/register-OFFLINE.png')");
        tab.css("left", "50%");
        $scope.isLogin = true;
      }
    }
  })
  .controller('ProfileCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory, $timeout) {
      $scope.changePass = function () {
        $state.go("change-pass");
      }
  })
  .controller('ChangePassCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory, $timeout) {

  })
  .controller('RanksCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory, $timeout) {
    function innerStart() {
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/topPlayer", $rootScope.gamer.user).success(function (data, status, headers, config) {
        $scope.ranks = data;
        menuService.stopLoading();
        menuService.ranksTutorial();
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err);
      });
    }
    $scope.$on("$ionicView.enter", function (scopes, states) {
      $timeout(function () {
        if (!$rootScope.gamer){
          menuService.startLoading();
          $http.post("https://dagala.cfapps.io/api/1/tempUser").success(function (data, status, headers, config) {
            $http.defaults.headers.common['Authorization'] = data.token;
            data.pass = data.user;
            $rootScope.saveGamer(data);
            menuService.stopLoading();
            innerStart();
          }).catch(function (err) {
            menuService.stopLoading();
            menuService.myHandleError(err, false);
          });
        } else {
          innerStart();
        }
      }, 700);
    });
    $scope.ranksBack = function () {
      $ionicHistory.goBack();
    };
  })
  .controller('SelectCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory, $timeout,$ionicPopup) {
    $scope.byChance = function () {
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
    $scope.byUsername = function () {
      $state.go("username");
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('UsernameCtrl', function ($scope, $state, $rootScope, $http, menuService, $ionicHistory, $timeout,$ionicPopup) {
    $scope.search = function (username) {
      menuService.startLoading();
      $http.post("https://dagala.cfapps.io/api/1/friendly",$rootScope.gamer.user + "," + username).success(function (data, status, headers, config) {
        menuService.stopLoading();
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
                menuService.myMessage("درخواست بازی برای کاربر مورد نظرت ارسال شد، بعد از تاییدِ دوستت می تونید باهم بازی کنید");
              }
            },
            {text: '<span class="myText">نه</span>'}
          ]
        });
      }).catch(function (err) {
        menuService.stopLoading();
        menuService.myHandleError(err, false);
      });
    };
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
  .controller('ForgetCtrl', function ($scope, $state, menuService, $http, $ionicHistory) {
    $scope.submit = function (username) {
      menuService.startLoading();
      var signUpUrl = "https://dagala.cfapps.io/api/1/forget";
      $http.post(signUpUrl, username)
        .success(function (suc) {
          if (suc === "201") {
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
          if (suc === 200) {
            menuService.myMessage("کلمه عبور با موفقیت تغییر کرد");
            $state.go("login");
          } else if (suc === 301) {
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
      var username = $("#username").val();
      if (username.indexOf(" ") >= 0){
        menuService.myMessage("نام کاربری نباید دارای فاصله باشد", "خطا");
        return;
      }
      if (username.indexOf(",") >= 0){
        menuService.myMessage("نام کاربری نباید دارای کاما(,) باشد", "خطا");
        return;
      }
      menuService.startLoading();
      var signUpUrl = "https://dagala.cfapps.io/api/1/signup";
      var d = {
        username: username,
        mobile: $("#tel").val(),
        password: $("#pass").val(),
        avatar: $scope.avatar,
        tempUser: $rootScope.gamer.user
      };
      $http.post(signUpUrl, d)
        .success(function (data, status, headers, config) {
          if (data === 400) {
            menuService.myMessage("کاربر دیگری با این نام کاربری قبلا ثبت نام کرده", "خطا");
            menuService.stopLoading();
          } else {
            menuService.myMessage("ثبت نام شما با موفقیت انجام شد");
            $rootScope.gamer.user = d.username;
            $rootScope.gamer.pass = d.password;
            $rootScope.gamer.token = data.token;
            $rootScope.saveGamer(data);
            $state.go("home");
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

