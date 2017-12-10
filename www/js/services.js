var app = angular.module('starter.services', []);

app.service('menuService', function ($ionicLoading, $ionicPopup, $state, $http, $rootScope) {
  var db = openDatabase('mydb', '1.0', 'OMIDDB', 2 * 1024 * 1024);
  var playedGames = [];
  var startLoading = function () {
    myLoading();
  };
  var stopLoading = function () {
    myStopLoading();
  };
  var myHandleError = function (err, isFromLogin) {
    if (err && err.status == 401) {
      if (isFromLogin) {
        myMessage("نام کاربری یا رمز عبور اشتباه می باشد", "خطا");
      } else {
        myMessage("لطفا مجددا اطلاعات حساب خود را وارد نمایید", "خطا");
        $state.go("login");
      }
    } else if (err && (err.status == 0 || err.status == -1)) {
      var networkState = navigator.connection.type;
      if (networkState === Connection.NONE) {
        window.plugins.toast.showShortBottom('لطفا اتصال اینترنت خود را بررسی کنید');
      } else {
        $ionicPopup.alert({
          template: '<img class="my-maintenance" src="./img/gem.png">',
          buttons: [
            {text: '<img class="my-button" src="http://dagala.ir/img/maintenance.png">'}
          ]
        });
      $(".popup").css("width", "95%");
      }
    } else if (err && err.status == 418) {
      $ionicPopup.alert({
        title: '<span class="myText">بروزرسانی</span>',
        template: '<div class="myText" style="padding: 12px;direction: rtl;text-align: right;line-height: 1.5em">    <div style="direction: rtl;padding-top: 20px;line-height: 3em">' +
        '<span class="myText">رقیب شما بازی ای کرده که شما بدلیل عدم بروزرسانی آنرا ندارید. لطفا بازی را بروزرسانی کنید</span></div></div>',
        buttons: [
          {
            text: '<img class="my-button" src="./img/15-dokme.png">',
            onTap: function (e) {
              navigator.app.exitApp();
            }
          }
        ]
      });
      $(".popup").css("width", "90%");
      //$(".popup-buttons").css("display", "none");
    } else {
      window.plugins.toast.showShortBottom('خطا در ارتباط با سرور');
    }
  };
  var myMessage = function (msg, title) {
    var t = title ? title : '';
    $ionicPopup.alert({
      title: '<span class="myText">' + t + '</span>',
      template: '<div class="myText" style="font-size: 24px;padding: 12px;direction: rtl;text-align: right;line-height: 1.5em">' + msg + '</div>',
      buttons: [
        {text: '<img class="my-button" src="./img/15-dokme.png">'}
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
          content: 'داگالا سرزمین تفریح و سرگرمی و رقابت',
          type: 'modal'
        }
      }, {
        wrapper: '#train',
        popup: {
          content: 'اگر میخوای تمرین کنی و رکورد بزنی اینجاست',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -120
        }
      }, {
        wrapper: '#league',
        popup: {
          content: 'اگر میخوای تو لیگای مختلف شرکت کنی و جایزه ببری بیا اینجا',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -120
        }
      }, {
        wrapper: '#battle',
        popup: {
          content: 'اگر دنبال یه حریف شانسی هستی تا تواناییهاتو به چالش بکشی جاش اینجاست',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: 100
        }
      }, {
        wrapper: '.menu-open-button',
        popup: {
          content: 'اینم منو، حتما بهش سر بزن',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -80
        }
      }, {
        wrapper: '#cupT',
        popup: {
          content: 'رتبه شما را در کل بازی نشان می دهد',
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
          content: 'تعداد الماسهایتان که برای شرکت در لیگها لازم دارید',
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
          content: 'از اینجا دسته بندی رو انتخاب کن و از بین بازی هاش یکی رو انتخاب کن',
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
          content: 'اگر انصراف بدی سکه هات برگردونده نمیشه',
          type: 'tooltip',
          position: 'bottom',
          offsetArrowHorizontal: -140
        }
      }, {
        wrapper: '#playBtn',
        popup: {
          content: 'اگه نفر اول باشی تو بازیو انخاب می کنی وگرنه باید بازی که حریف انتخاب کرده بود بازی کنی. بازی بعدیو نفر مقابل انتخاب می کنه. بازی آخرم ما انتخاب می کنیم',
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
          content: 'اینجا لیگ های ما رو میبینی. برای ورود به لیگ باید الماس داشته باشی',
          type: 'modal'
        }
      }, {
        wrapper: '#joinLeague',
        popup: {
          content: 'برای عضویت تو لیگ این دکمه رو بزن. بعد از عضویت از همینجا وضعیت لیگ رو پیگیری کن. با پایین کشیدن صفحه اطلاعات بروز میشه',
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
      }, {
        wrapper: '.coining1',
        popup: {
          content: 'با دیدن ویدیو سکه هاتو زیاد کن',
          type: 'tooltip',
          position: 'bottom'
        }
      }, {
        wrapper: '.coining2',
        popup: {
          content: 'هرروز یبار میتونی گردونرو بچرخونی و تا 45 تا سکه بگیری. البته ممکنه تا 10 تا هم از سکه هات کم شه، گردونس دیگه!',
          type: 'tooltip',
          position: 'bottom'
        }
      }, {
        wrapper: '.coining3',
        popup: {
          content: 'حداکثر 3 تا از دوستاتو میتونی اینجا معرفی کنی و به هرکدوم 150 تا سکه بدی',
          type: 'tooltip',
          position: 'top'
        }
      }, {
        wrapper: '.coining4',
        popup: {
          content: 'اینجا میتونی سکه یا الماس یا تجربه بخری. تجربه باعث میشه تا یه زمان محدودی محاسبه سطحت چند برابر در نظر گرفته شه تو هر بازی',
          type: 'tooltip',
          position: 'top'
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
  var addPlayedGames = function (x) {
    playedGames.push(x)
  };
  var getPlayedGames = function () {
    return playedGames;
  };
  var resetPlayedGames = function () {
    playedGames = [];
  };
  return {
    startLoading: startLoading,
    stopLoading: stopLoading,
    myHandleError: myHandleError,
    getDb: getDb,
    myMessage: myMessage,
    homeTutorial: homeTutorial,
    boardTutorial: boardTutorial,
    newGameTutorial: newGameTutorial,
    leagueTutorial: leagueTutorial,
    coiningTutorial: coiningTutorial,
    ranksTutorial: ranksTutorial,
    homeHelp: homeHelp,
    boardHelp: boardHelp,
    newGameHelp: newGameHelp,
    leagueHelp: leagueHelp,
    coiningHelp: coiningHelp,
    ranksHelp: ranksHelp,
    battlefieldTutorial: battlefieldTutorial,
    battlefieldHelp: battlefieldHelp,
    addPlayedGames : addPlayedGames,
    getPlayedGames : getPlayedGames,
    resetPlayedGames : resetPlayedGames
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







