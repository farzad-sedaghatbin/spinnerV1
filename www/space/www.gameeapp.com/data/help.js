/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>اینم بازی محبوب spinner</p>' +
        '<p style="direction: rtl">نزارید اسپینر متوقف بشه پنج بار فرصت دارید تا بچرخونیدش</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
