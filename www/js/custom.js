function myLoading() {
  var parent = $("<div style='pointer-events: none'></div>");
  parent.addClass("omid_spinner");
  var spinner = $("<div></div>");
  var dot1 = $("<div></div>");
  var dot2 = $("<div></div>");
  parent.append(spinner);
  spinner.append(dot1);
  spinner.append(dot2);
  $("body").append(parent);
}
function myStopLoading(){
  $(".omid_spinner").remove();
}

