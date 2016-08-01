function updateStatus(element, parkNo) {
  dataStore = document.getElementById("buttonsArea")
  dataStore.setAttribute("data-parkno", parkNo)
  dataStore.setAttribute("data-status", element.value)
  if (element.getAttribute("data-reserved")) { // update how reserved determined
    document.getElementById("lightbox").style.display = "block"
  }
  else {
    putFetch()
  }
}

function passwordSubmit() { //add check for date field
  document.getElementById("lightbox").style.display = "none"
  var pass = document.getElementById("passwordEntry").value
  document.getElementById("passwordEntry").value = ""
  putFetch(pass)
}

function putFetch(password) { // pass in date field if found
  var parkNo = document.getElementById("buttonsArea").getAttribute("data-parkno")
  var parkStatus = document.getElementById("buttonsArea").getAttribute("data-status")
  fetch('carparkUpdate', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'parkno': parkNo,
      'status': parkStatus,
      'password': password
    })
  }).then(function(res) {
    if (res.ok) {
      window.location.reload(true);
    }
    else {
      alert("Data did not update");
    }
  })
}