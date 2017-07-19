var navWidth="200px";
var mapdata;

function initMap() {
    mapdata = new google.maps.Map(document.getElementById('map'), {
	center: {lat: 48.6809657, lng: 44.512527},
	zoom: 10,
	mapTypeId: 'satellite'
    });


    var markersCity = $.getJSON("../json/thecity.js", function(Json) {
	for (var i = 0; i < Json.length; i++){

	}
	console.log(Json); // this will show the info it in firebug console
    }); 
    
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
