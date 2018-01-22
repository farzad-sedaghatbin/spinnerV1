/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>با استفاده از سیارک  ها ، سیاره های بزرگ تر بسازید و مراقب باشید که ارتفاع سیاره ها زیاد نشه</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
