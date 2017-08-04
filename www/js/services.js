var app = angular.module('starter.services', []);

app.service('menuService', function ($ionicLoading, $ionicPopup, $state, $http) {
  var db = openDatabase('mydb', '1.0', 'OMIDDB', 1024 * 1024);
  var startLoading = function () {
    $ionicLoading.show({
      showBackdrop: true,
      hideOnStateChange: true,
      template: '<ion-spinner icon="lines"></ion-spinner>'
    });
  };
  var stopLoading = function () {
    $ionicLoading.hide();
  };
  var myHandleError = function (err, isFromLogin) {
    if (err == 401) {
      if (isFromLogin) {
        $ionicPopup.alert({
          title: '',
          template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">نام کاربری یا رمز عبور اشتباه می باشد</div>',
          buttons: [
            {text: '<span class="myText">ok</span>'}
          ]
        });
      } else {
        delete $http.defaults.headers.common.Authorization;
        getDb().transaction(function (tx) {
          tx.executeSql('DELETE FROM ANIJUU WHERE name != ?', ["adv"]);
        });
        $ionicPopup.alert({
          title: '<span class="myText">پیام</span>',
          template: '<div class="myText" style="font-size: 24px;padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">لطفا مجددا اطلاعات حساب خود را وارد نمایید</div>'
        });
      }
      $(".popup").css("width", "90%");
      $state.go("login");
    } else if (err && err.status == 0) {
      $cordovaToast.showShortBottom('لطفا اتصال اینترنت خود را بررسی کنید');
    } else if (err && err.status == 418) {
      $ionicPopup.alert({
        title: '<span class="myText">بروزرسانی</span>',
        template: '<div class="myText" style="padding-bottom: 10px;direction: rtl;text-align: right;line-height: 1.5em">    <div style="direction: rtl;padding-top: 20px;line-height: 3em">' +
        '<span class="myText">لطفا برنامه را بروزرسانی کنید</span></div>'+
        '<div ng-show="!isAndroid()" style="direction: rtl;padding-top: 20px;line-height: 3em"><i class="icon ion-checkmark" style="color: #F06A21;font-size: medium"></i>'+
        '<a style="color: #F06A21;text-decoration: none" class="myText" href="https://goo.gl/Xqzk1X">اپل استور</a></div>'+
        '<div ng-show="isAndroid()" style="direction: rtl;padding-top: 20px;line-height: 3em"><i class="icon ion-checkmark" style="color: #F06A21;font-size: medium"></i>'+
        '<a style="color: #F06A21;text-decoration: none" class="myText" href="https://goo.gl/IzDMd3">گوگل پلی</a></div>'+
        '<div ng-show="isAndroid()" style="direction: rtl;padding-top: 20px;line-height: 3em"><i class="icon ion-checkmark" style="color: #F06A21;font-size: medium"></i>'+
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
  var getDb = function () {
    return db;
  };
  return {
    startLoading: startLoading,
    stopLoading: stopLoading,
    myHandleError: myHandleError,
    getDb: getDb
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







