$(document).ready(function(){
  var thisurl = window.location.href.substring(0, window.location.href.lastIndexOf(location.host) + location.host.length + 1);
  var name = window.location.href.substring(window.location.href.lastIndexOf(location.host) + location.host.length + 1, window.location.href.indexOf("/dashboard"));
  function getmonthdue(month, data){
    var thismonth = [];
    for (var i in data){
      if (data[i].month === month){
        thismonth.push(data[i])
      }
    }
    return thismonth;
  }
  $(document).on('click', '.month', function(){
    var month = this.innerHTML;
    $('#dueinfo').empty();
    $.ajax({
      url: thisurl + "data" + "/" + name,
      method: "GET",
      success: function(data){
        if (getmonthdue(month, data).length !== 0){
        var datablock = getmonthdue(month, data);
        for (var i in datablock){
          var elementname = document.createElement("div");
          var elementamount = document.createElement("div");
          var status = document.createElement("button");
          elementname.className = "bill";
          elementamount.className = "amount";
          status.className = datablock[i].status;
          status.id = datablock[i].id;
          elementname.innerHTML = datablock[i].bill;
          elementamount.innerHTML = "$" + datablock[i].amount;
          $('#dueinfo').append(elementname);
          $('#dueinfo').append(elementamount);
          $('#dueinfo').append(status);
          }
        }
        else { $('#dueinfo').html("No data from this month yet!");}
      }
    });
  });


  $(document).on('click', '.false', function(){
    var link = thisurl + "update/" + this.id + "/" + true;
    this.className = "true";
    $.ajax({
      url: link,
      method: "POST",
      success: function(data){
        console.log("updated " + this.id + " " + true);
      }
    });
  });
  $(document).on('click', '.true', function(){
    var link = thisurl + "update/" + this.id + "/" + false;
    this.className = "false";
    $.ajax({
      url: link,
      method: "POST",
      success: function(data){
        console.log("updated " + this.id + " " + false);
      }
    });
  });
});
