var marker, mapdata, infowindow;
var navWidth="200px";
var defaultPos = {lat: 48.6809657, lng: 44.512527};

var battlefront = []; // 
var cityMarkers = []; // Regular Markers

var sovietMarkers = []; // Cluster Marker
var wehrmachtMarkers = []; // Cluster Marker

var cityJson = $.getJSON("../json/thecity.js");

function initMap() {
    infowindow = new google.maps.InfoWindow();
    mapdata = new google.maps.Map(document.getElementById('map'), {
	center: defaultPos,
	zoom: 10,
	mapTypeId: 'satellite'
    });

    setCityMarkers();
}

// pass json
function setCityMarkers(){    
    for (var i = 0; i < cityJson.length; i++) {
	marker = new google.maps.Marker({
	    position: new google.maps.LatLng(locations[i][2], locations[i][3]),
	    map: mapdata
	});
    }
    console.log(cityJson); // this will show the info it in firebug console
}

function openNav() {
    if(document.getElementById("mySidenav").style.width == navWidth){
	closeNav();
    }
    else{
	document.getElementById("mySidenav").style.width = navWidth;
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0px";
}

window.onclick = function(event) {
    if(	!event.target.matches(".button") &&
	!event.target.matches(".sidenav") &&
	!event.target.matches("p") &&
	!event.target.matches(".toggle-button-sidenav") &&
	!event.target.matches(".nav-button") &&
	document.getElementById("mySidenav").style.width == navWidth) {
	
	closeNav();
    }
    $('#mySidenav').on('click', 'a', function() {
	console.log($(this).index());
    });

}

window.onload = function(){

}

// var template = {
//     {"name": "",
//      "description": "",
//      "lat": ,
//      "lng":
//     }
// }
