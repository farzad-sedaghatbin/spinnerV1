/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره الماس ها رو بترکونید</p>' +
        '<p style="direction: rtl">باید سعی کنید به صورت افقی یا عمودی حداقل سه رنگ مشابه رو در کنار هم قرار بدید </p>'+
        '<p style="direction: rtl">چند تا نکته رو حواستون باشه زمانتون محدوده و اینکه اگر بتونید 4 یا 5 الماس رو کنار هم قرار بدین بازی هم بهتون جایزه زمان و خالی کردن عمودی و افقی میده  </p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
