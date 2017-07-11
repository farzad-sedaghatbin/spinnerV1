function loading() {
  var parent = $("<div></div>");
  parent.addClass("omid_spinner");
  var spinner = $("<div></div>");
  spinner.addClass("spinner");
  var dot1 = $("<div></div>");
  dot1.addClass("dot1");
  var dot2 = $("<div></div>");
  dot2.addClass("dot2");
  parent.append(spinner);
  spinner.append(dot1);
  spinner.append(dot2);
  $("body").append(parent);
}
function stopLoading(){
  $(".omid_spinner").remove();
}
function alert() {
  bootbox.dialog({
    message: '<p style="color: black;direction: rtl;text-align: right">Please wait while we do something...</p>',
    closeButton:false,
    buttons:{
      alert:{
        label:"Ok"
      }
    }
  });
}
function myPost() {
  var request = $.ajax({
    url: "http://spinnerv1.cfapps.io/api/1/signup",
    type: "POST",
    data: {username:"omid",password:"123"}
  });
  request.done(function(msg) {
    alert("sdfsdf")
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}
