var app = angular.module('starter.services', []);

app.service('menuService', function ($ionicLoading, $ionicPopup, $state, $http,$rootScope) {
  var db = openDatabase('mydb', '1.0', 'OMIDDB', 1024 * 1024);
  var startLoading = function () {
    myLoading();
  };
  var stopLoading = function () {
    myStopLoading();
  };
  var myHandleError = function (err, isFromLogin) {
    if (err == 401) {
      if (isFromLogin) {
        myMessage("نام کاربری یا رمز عبور اشتباه می باشد","خطا");
      } else {
        var url = "https://dagala.cfapps.io/api/1/user_authenticate";
        var d = {
          username: $rootScope.gamer.user,
          password: $rootScope.gamer.pass,
          rememberMe: true
        };
        $http.post(url, d).success(function (data, status, headers, config) {
          delete $http.defaults.headers.common.Authorization;
          $http.defaults.headers.common.Authorization = data.token;
          data.pass = d.password;
          data.user = d.username;
          $rootScope.saveGamer(data);
          myMessage("لطفا مجددا عملیات مورد نظر خود را اجرا کنید");
        }).catch(function (err) {
          myMessage("لطفا مجددا اطلاعات حساب خود را وارد نمایید","خطا");
          getDb().transaction(function (tx) {
            tx.executeSql('DELETE FROM MYGAME WHERE name="gamer"',[],function (tx, results) {
              var url = "https://dagala.cfapps.io/api/1/tempUser";
              $http.post(url).success(function (data, status, headers, config) {
                $http.defaults.headers.common['Authorization'] = data.token;
                data.pass = data.user;
                $rootScope.saveGamer(data);
              }).catch(function (err) {
              });
            });
          });
          $state.go("login");
        });
      }
    } else if (err && err.status == 0) {
      window.plugins.toast.showShortBottom('لطفا اتصال اینترنت خود را بررسی کنید');
    } else if (err && err.status == 418) {
      $ionicPopup.alert({
        title: '<span class="myText">بروزرسانی</span>',
        template: '<div class="myText" style="padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">    <div style="direction: rtl;padding-top: 20px;line-height: 3em">' +
        '<span class="myText">لطفا بازی را بروزرسانی کنید</span></div></div>'
      }).then(function (res) {
        navigator.app.exitApp();
      });
      $(".popup").css("width", "90%");
      //$(".popup-buttons").css("display", "none");
    } else {
      window.plugins.toast.showShortBottom('خطا در ارتباط با سرور');
    }
  };
  var myMessage = function (msg,title) {
    var t = title ? title : '';
    $ionicPopup.alert({
      title: '<span class="myText">'+t+'</span>',
      template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">' + msg + '</div>',
      buttons: [
        {text: '<span class="myText">باشه</span>'}
      ]
    });
    $(".popup").css("width", "90%");
  };
  var getDb = function () {
    return db;
  };
  var homeTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="homeTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["homeTutorial", true]);
          homeHelp();
        }
      }, null);
    })
  };
  var homeHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'این بهترین بازی دنیاس کله پوکا',
          type: 'modal'
        }
      }, {
        wrapper: '#train',
        popup: {
          content: 'اگر میخوای تمرین کنی و رکورد بزنی بهترین جا اینجاست',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -120
        }
      }, {
        wrapper: '#league',
        popup: {
          content: 'اگر میخوای تو لیگای مختلف شرکت کنی و جایزه ببری بیا اینجا',
          type: 'tooltip',
          position: 'bottom'
        }
      }, {
        wrapper: '#battle',
        popup: {
          content: 'اگر دنبال یه حریف شانسی هستی تا تواناییاتو به چالش بکشی جاش اینجاست',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: 100
        }
      }, {
        wrapper: '.menu-open-button',
        popup: {
          content: 'این منو هست، حتما بش سر بزن',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -80
        }
      }, {
        wrapper: '#cupT',
        popup: {
          content: 'رتبه شما را نشان می دهد',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -300
        }
      }, {
        wrapper: '#coinT',
        popup: {
          content: 'تعداد سکه های شما',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -300
        }
      }, {
        wrapper: '#gemT',
        popup: {
          content: 'تعداد الماسهایتان که برای شرکت در لیگها لازم دارید و تنها راه بدست آوردن خریدنشان است',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -300
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');
  };
  var boardTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="boardTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["boardTutorial", true]);
          boardHelp();
        }
      }, null);
    })
  };
  var boardHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'حالا باید یه بازی انتخاب کنید',
          type: 'modal'
        }
      }, {
        wrapper: '#a0',
        popup: {
          content: 'از اینجا دسته بندی رو انتخاب و تو هر دسته بندی بازی مربوط به اون دسته رو انتخاب کن',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -140
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');
  };
  var newGameTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="newGameTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["newGameTutorial", true]);
          newGameHelp();
        }
      }, null);
    })
  };
  var newGameHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'یه چالشو شروع کردی',
          type: 'modal'
        }
      }, {
        wrapper: '#decline',
        popup: {
          content: 'اگر انصراف بدی سکه هات بت برگردونده نمیشه',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -140
        }
      }, {
        wrapper: '#playBtn',
        popup: {
          content: 'اگه نفر اول باشی تو بازیو انخاب می کنی وگرنه باید بازی ای که حریف انتخاب کرده بود بازی کنی. بازی بعدیو نفر مقابل انتخاب می کنه. بازی آخرم ما انتخاب می کنیم',
          type: 'tooltip',
          position: 'bottom'
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');
  };
  var leagueTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="leagueTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["leagueTutorial", true]);
          leagueHelp();
        }
      }, null);
    })
  };
  var leagueHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'اینجا لیگ های ما رو میبینی. برای ورود به لیگ باید الماس بخری',
          type: 'modal'
        }
      }, {
        wrapper: '#joinLeague',
        popup: {
          content: 'برای عضویت تو لیگ این دکمه رو بزن. بعد از عضویت هم وضعیتهای مختلف لیگ رو پیگیری کن از همینجا.با پایین کشیدن صفحه اطلاعات بروز میشه',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -140
        }
      }, {
        wrapper: '#prices',
        popup: {
          content: 'برای دیدن جوایز نفرات برتر اینو بزن',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -120
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');

  };
  var coiningTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="coiningTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["coiningTutorial", true]);
          coiningHelp();
        }
      }, null);
    })
  };
  var coiningHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'اینجا به روشهای مختلف میتونی سکه هاتو زیاد کنی یا اینکه سکه و الماس بخری',
          type: 'modal'
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');
  };
  var ranksTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="ranksTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["ranksTutorial", true]);
          ranksHelp();
        }
      }, null);
    })
  };
  var ranksHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'اینجا میتونی رتبه برترین های بازی رو ببینی',
          type: 'modal'
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');
  };
  var battlefieldTutorial = function () {
    db.transaction(function (tx) {
      tx.executeSql('SELECT d.val FROM MYGAME d WHERE d.name="battlefieldTutorial"', [], function (tx, results) {
        var len = results.rows.length, i, result = '';
        if (!results.rows || results.rows.length == 0) {
          tx.executeSql('INSERT INTO MYGAME (name, val) VALUES (?, ?)', ["battlefieldTutorial", true]);
          battlefieldHelp();
        }
      }, null);
    })
  };
  var battlefieldHelp = function () {
    $('ion-content').pagewalkthrough({
      name: 'introduction',
      steps: [{
        popup: {
          content: 'این صفحه جزییات بازیتونه. هرکی برنده شه سکه های بازی مال اون میشه. اگه زمان بازی تموم شه کسی که نوبتش بوده بازی کنه بازندس. با کشیدن صفحه به پایین از آخرین وضعیت بازیتون باخبر شو',
          type: 'modal'
        }
      }, {
        wrapper: '#taslim',
        popup: {
          content: 'اگه تسلیم شی میبازی و سکه های بازی به رقیبت میرسه',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -140
        }
      }, {
        wrapper: '#playgame',
        popup: {
          content: 'اگه نوبتته بازی کن اگه نوبت حریفته صبر کن بازیش تموم شه',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: 60
        }
      }, {
        wrapper: '#yourscore',
        popup: {
          content: 'امتیاز تو',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -120
        }
      }, {
        wrapper: '#hisscore',
        popup: {
          content: 'امتیاز حریف',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: 10
        }
      }]
    });
    $('ion-content').pagewalkthrough('show');
  };
  return {
    startLoading: startLoading,
    stopLoading: stopLoading,
    myHandleError: myHandleError,
    getDb: getDb,
    myMessage: myMessage,
    homeTutorial : homeTutorial,
    boardTutorial : boardTutorial,
    newGameTutorial : newGameTutorial,
    leagueTutorial : leagueTutorial,
    coiningTutorial : coiningTutorial,
    ranksTutorial : ranksTutorial,
    homeHelp : homeHelp,
    boardHelp : boardHelp,
    newGameHelp : newGameHelp,
    leagueHelp : leagueHelp,
    coiningHelp : coiningHelp,
    ranksHelp : ranksHelp,
    battlefieldTutorial : battlefieldTutorial,
    battlefieldHelp : battlefieldHelp
  };
})
  .service('authHttpResponseInterceptor', ['$q', function ($q) {
    return {
      responseError: function (rejection) {
        if (rejection.status === 401) {
          throw 401;
        }
        return $q.reject(rejection);
      }
    }
  }]);







