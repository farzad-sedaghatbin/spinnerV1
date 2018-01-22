/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>حتما همه بلدن این بازیو که یک بازی نوستالژی هم هست دونه ها رو بخورید و مراقب دیوار ها و دمتون باشید</p>' ,

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
