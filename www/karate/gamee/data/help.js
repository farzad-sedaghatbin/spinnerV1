/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره کاری کنید که کاراته کار ما کلی هیزم جمع کنه</p>' +
        '<p style="direction: rtl">همینطور که دارید درخت و قطع میکنید مرافب شاخه ها باشید و با استفاده از دکمه به چپ و راست برید</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
