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
function post() {
  var request = $.ajax({
    url: "script.php",
    type: "POST",
    data: {id : menuId},
    dataType: "html"
  });
  request.done(function(msg) {
    $("#log").html( msg );
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}
