/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره این قطره نفت تنها رو تا اونجا که میتونید جلو ببرید</p>' +
        '<p style="direction: rtl">یک دکمه دارید که با استفاده از اون با پرش روی دکل های نفتی باید به جلو حرکت کنید</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
