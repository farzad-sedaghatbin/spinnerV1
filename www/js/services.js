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
      $cordovaToast.showShortBottom('لطفا اتصال اینترنت خود را بررسی کنید');
    } else if (err && err.status == 418) {
      $ionicPopup.alert({
        title: '<span class="myText">بروزرسانی</span>',
        template: '<div class="myText" style="padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">    <div style="direction: rtl;padding-top: 20px;line-height: 3em">' +
        '<span class="myText">لطفا بازی را بروزرسانی کنید</span></div>' +
        '<div ng-show="!isAndroid()" style="direction: rtl;padding-top: 20px;line-height: 3em"><i class="icon ion-checkmark" style="color: #F06A21;font-size: medium"></i>' +
        '<a style="color: #F06A21;text-decoration: none" class="myText" href="https://goo.gl/Xqzk1X">اپل استور</a></div>' +
        '<div ng-show="isAndroid()" style="direction: rtl;padding-top: 20px;line-height: 3em"><i class="icon ion-checkmark" style="color: #F06A21;font-size: medium"></i>' +
        '<a style="color: #F06A21;text-decoration: none" class="myText" href="https://goo.gl/IzDMd3">گوگل پلی</a></div>' +
        '<div ng-show="isAndroid()" style="direction: rtl;padding-top: 20px;line-height: 3em"><i class="icon ion-checkmark" style="color: #F06A21;font-size: medium"></i>' +
        '<a style="color: #F06A21;text-decoration: none" class="myText" href="https://goo.gl/Duh3Mn">کافه بازار</a></div></div>'
      }).then(function (res) {
        navigator.app.exitApp();
      });
      $(".popup").css("width", "90%");
      //$(".popup-buttons").css("display", "none");
    } else {
      $cordovaToast.showShortBottom('خطا در ارتباط با سرور');
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
  return {
    startLoading: startLoading,
    stopLoading: stopLoading,
    myHandleError: myHandleError,
    getDb: getDb,
    myMessage: myMessage
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







