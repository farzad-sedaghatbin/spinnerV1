function myLoading() {
  var parent = $("<div></div>");
  parent.addClass("omid_spinner");
  var spinner = $("<div></div>");
  spinner.addClass("myspinner");
  var dot1 = $("<div></div>");
  dot1.addClass("dot1");
  var dot2 = $("<div></div>");
  dot2.addClass("dot2");
  parent.append(spinner);
  spinner.append(dot1);
  spinner.append(dot2);
  $("body").append(parent);
}
function myStopLoading(){
  $(".omid_spinner").remove();
}

