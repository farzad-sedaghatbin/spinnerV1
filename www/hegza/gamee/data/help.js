/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره حسابی سرگیجه بگیرید</p>' +
        '<p style="direction: rtl">به هر شکلی که میتونید سه تا رنگ یک جور رو به هم وصل کنید و امتیاز بگیرید حواستون باشه برجتون بلند نشه</p>'+
        '<p style="direction: rtl">دوتا دکمه دارید که یکیشون شش ضلعی رو به سمت راست میچرخونه یکیشون به چپ</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
