document.getElementById('assignInputForm').addEventListener('submit', saveAssign);

function saveAssign(e) {
  e.preventDefault();
  var addComments = document.getElementById('addComments').value;
  var assignServerity = document.getElementById('assignServerity').value;
  var assignName = document.getElementById('assignName').value;
  var month = parseInt(document.getElementById('month').value);
  var day = document.getElementById('day').value;
  var year = document.getElementById('year').value;
  var assignId = chance.guid();
  var assignstatus = 'Open';
  if(month == "default" || day == "default" || year == "default")
  {
    alert('Please choose when');
  }
  else {
    var assign = {
      id: assignId,
      comment: addComments,
      severity: assignServerity,
      name: assignName,
      month: month,
      day: day,
      year: year,
      status: assignstatus
    }
  
    if (localStorage.getItem('assigns') == null) {
      var assigns = [];
      assigns.push(assign);
      localStorage.setItem('assigns', JSON.stringify(assigns));
    } else {
      var assigns = JSON.parse(localStorage.getItem('assigns'));
      assigns.push(assign);
      localStorage.setItem('assigns', JSON.stringify(assigns));
    }
      showTodos();
      document.getElementById('assignInputForm').reset();
  }
}

function setStatusClosed(id) {
  var assigns = JSON.parse(localStorage.getItem('assigns'));

  for (var i = 0; i < assigns.length; i++) {
    if (assigns[i].id == id) {
      assigns[i].status = 'Closed';
    }
  }

  localStorage.setItem('assigns', JSON.stringify(assigns));

  showTodos();
}

function deleteAssign(id) {
  var assigns = JSON.parse(localStorage.getItem('assigns'));

  for (var i = 0; i < assigns.length; i++) {
    if (assigns[i].id == id) {
      assigns.splice(i, 1);
    }
  }

  localStorage.setItem('assigns', JSON.stringify(assigns));

  showTodos();
}

function showTodos() {
  var assigns = JSON.parse(localStorage.getItem('assigns'));
  var assignList = document.getElementById('assignList');
  assignList.innerHTML = '';
  for(var i = assigns.length - 1; i >= 0; i--) {
    var id = assigns[i].id;
    var comment = assigns[i].comment;
    var severity = assigns[i].severity;
    var name = assigns[i].name;
    var month = assigns[i].month;
    var day = assigns[i].day;
    var year = assigns[i].year;
    var status = assigns[i].status;
    assignList.innerHTML += '<div class="well">'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<p>'+remainingTime(year,month,day)+' Days left</p>'+
                              '<h3 class="text-capitalize">' + name + '</h3>'+
                              '<p class="pl-4">- ' + comment + '</p>'+
                              '<p>Severity: ' + severity + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteAssign(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div></br>';
  }
}
function remainingTime(year,month,day)
{
  var countDownDate = new Date(year,month-1,day).getTime();
  var now = new Date().getTime(); 
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (distance < 0) {
    return "EXPIRED";
  }
  else 
  {
    return days;
  }
}