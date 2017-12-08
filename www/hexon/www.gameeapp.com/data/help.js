/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره با چیدن این اشکال خونه زنبورهارو تمیز نگه دارید</p>' +
        '<p style="direction: rtl">برای بدست اوردن امتیاز صرف نظر از رنگ اشکال باید بتونید یک خط از هر سمتی به سمت دیگه وصل کنید</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
