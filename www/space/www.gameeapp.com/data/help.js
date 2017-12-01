/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره این لاستیک شیطون رو تا اونجا که میتونید جلو ببرید</p>' +
        '<p style="direction: rtl">۲تا دکمه دارید که با یکیش از رو موانع میپرید و با یکیش سرعتتون کم میشه</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
