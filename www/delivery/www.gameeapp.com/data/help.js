/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>چالش اصلی شما در این بازی عکس العمل های سریع هست</p>' ,

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
