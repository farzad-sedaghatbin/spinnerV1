/**
 * Created by farzad on 11/18/17.
 */
var homeHelp = function () {
  $('body').pagewalkthrough({
    name: 'introduction',
    steps: [{
      popup: {
        content:
        '<p>تو این بازی قراره تو فینال جام جهانی پنالتی بزنین</p>' +
        '<p style="direction: rtl"> بدون استرس پشت توپ وایسین با دستتون مسیر حرکت توپ و شدت ضربه رو مشخص کنید </p>'+
        '<p style="direction: rtl"> بعد از اولین گلتون اگر سه تا از شوت هاتون گل نشه بازی تموم میشه</p>',

        type: 'modal'
      }
    }]
  });
  $('body').pagewalkthrough('show');
};
