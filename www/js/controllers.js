'use strict';
angular.module('starter.controllers', [])
  .controller('HomeCtrl', function ($scope,$state) {
    $scope.training = function () {
      $state.go("board");
    };
    $scope.buy = function () {
      $state.go("buy")
    }
  })
  .controller('BoardCtrl', function ($scope,$timeout) {
    var root = true;
    $scope.config ={
      status:false,
      submenus:[
        {menuicon:'icon ion-social-twitter',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-facebook',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-googleplus',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-github',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-whatsapp-outline',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-buffer-outline',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-windows',img:'',adr:'javascript:;'},
        {menuicon:'icon ion-social-html5',img:'',adr:'javascript:;'}

      ]
    }
    $scope.toglefun = function($config)
    {
      var myEl = angular.element(document.querySelector('.m'));
      if (root) {
        myEl.toggleClass('active');
      } else {
        myEl.toggleClass('omid');
        $timeout(function () {
          root = true;
          myEl.toggleClass('active');
        },500)
        $timeout(function () {
          $scope.config ={
            status:false,
            submenus:[
              {menuicon:'icon ion-social-twitter',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-facebook',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-googleplus',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-github',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-whatsapp-outline',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-buffer-outline',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-windows',img:'',adr:'javascript:;'},
              {menuicon:'icon ion-social-html5',img:'',adr:'javascript:;'}

            ]
          };
        },300)
      }

    };
    $scope.menufun = function(s){
      root = false;
      var myEl = angular.element(document.querySelector('.m'));
      myEl.toggleClass("active");
      $timeout(function () {
        myEl.toggleClass('omid');
      },500)
      switch(s){
        case 1:
          $scope.config ={
            status:false,
            submenus:[
              {menuicon:'icon ion-social-twitter',img:'',adr:'spinner/spinner.html'},
              {menuicon:'icon ion-social-facebook',img:'',adr:'motor/www.gameeapp.com/game/kAHVRl.html'},
              {menuicon:'icon ion-social-googleplus',img:'',adr:'space/www.gameeapp.com/game/ibBTDViUP.html'},
              {menuicon:'icon ion-social-whatsapp-outline',img:'',adr:'ninja/www.gameeapp.com/game/G1oy49taR.html'},
              {menuicon:'icon ion-social-buffer-outline',img:'',adr:'puzzle/www.gameeapp.com/game/FGM7TVW2Ma.html'},
              {menuicon:'icon ion-social-windows',img:'',adr:'car/www.gameeapp.com/game/oFfW2omiW.html'}
            ]
          }
          break;
        case 2: console.log('facebook');break;
        case 2: console.log('googleplus');break;
        case 4: console.log('github');break;
        case 5: console.log('whatsapp');break;
        case 6: console.log('buffer');break;
        case 7: console.log('window');break;
        case 8: console.log('html');break;
        default : break;
      }
    }
  })
  .controller('BuyCtrl', function ($scope,$state) {
  })
  .controller('LoginCtrl', function ($scope,$state) {
  });

