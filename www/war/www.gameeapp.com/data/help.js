/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره پینت بال بازی کنید هرکسی و که دیدین و نشونه گیر روش بود سری شلیک کنید</p>' ,

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
