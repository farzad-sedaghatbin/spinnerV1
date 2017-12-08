/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره کلی کارهای هیجان انگیر بکنید</p>' +
        '<p style="direction: rtl">دوتا دکمه اصلی دارید که وقتی رو زمین هستید کار ترمز و گاز رو انجام میدن</p>'+
        '<p style="direction: rtl">و در زمان پرش میتونید باهشون در هوا بچرخین و امتیاز بگیرید هرچی بیشتر بچرخین امتیازم بیشتر میگیرید</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
