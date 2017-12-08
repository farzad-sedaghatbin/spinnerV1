/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره این توپ رنگی رو تا اونجا که میتونید جلو ببرید</p>' +
        '<p style="direction: rtl">حواستون باشه این توپ بعد از هر مرحله رنگش عوض میشه فقط هم میتونید از تو هم رنگ های خورش عبورش بدین </p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
