/*
  function initMap() {
  var uluru = {lat: 48.709657, lng: 44.512527};
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: uluru
  
  });
  
  var marker = new google.maps.Marker({
  position: uluru,
  map: map
  });

  }
*/
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 48.6809657, lng: 44.512527},
	zoom: 10,
	mapTypeId: 'satellite'
    });
}

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}
