/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره دست فرمونتون رو به چالش بکشید و این ماشین رو تا اونجا که میتونید جلو ببرید</p>' +
        '<p style="direction: rtl">۲تا دکمه دارید که با یکیش به سمت راست میرید و با دیگری به سمت چپ </p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
