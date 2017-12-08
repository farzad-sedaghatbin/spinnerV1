/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره کلی حساب کتاب کنید</p>' +
        '<p style="direction: rtl"> عددها رو به ضریبی از 3 برسونید و اونهارو با هم جمع کنید 4 تا دکمه داریم که هر کدام به یکی از 4 جهت اشاره میکنه و با استفاده از جهت ها اعداد رو با هم جمع کنید </p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
