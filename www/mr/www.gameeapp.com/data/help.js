/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره تعادل این پهلوون مارو حفظ کنید</p>' +
        '<p style="direction: rtl">باید سعی کنید اون وزنه سیاه رنگ در حال حرکت رو با استفاده از دکمه پایین صفحه به دو قسمت مساوی تقسیم کنید تا تعادل پهلوون به هم نخوره</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
