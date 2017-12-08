/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره سفینه رو از برخورد با اشیا سرگردان دور نگه دارید </p>' +
        '<p style="direction: rtl">هر زمانی که یک دور کامل بزنید و تمامی دونه هارو بخورید وارد دور بعدی میشید و اینکه با دکمه ای  که در اختیارتون هست میتونید هر بار مسیر رو عوض کنید</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
