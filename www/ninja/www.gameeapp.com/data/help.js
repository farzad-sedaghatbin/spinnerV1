/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این نینجا رو تا اونجا که میتونید جلو ببرید</p>' +
        '<p style="direction: rtl">یک دکمه دارید که با استفاده از اون باید جهت جاذبه رو عوض کنید تا نینجا رو از دره ها و بر خورد با دیوار ها دور نگه دارید</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
