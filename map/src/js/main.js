var mapdata, marker, infowindow;
var navWidth="200px";
var defaultPos = {lat: 48.75618876280552, lng: 44.5246696472168};

var battlefront = []; //
var cityMarkers = []; // Regular Markers

var sovietMarkers = []; // Cluster Marker
var wehrmachtMarkers = []; // Cluster Marker

// 0 = Name , 1 = description, 2 = lat, 3 = lng
var cityData = [
    [
	"Mamayev Kurgan",
	"A strategic hill that splits the city from north to south. Despite the heavily entrenched Soviet defenders, it was captured by the Wehrmacht on September 13, 1942. Control of the hill was of such importance for both sides, that entire divisions were destroyed down to the last man in order to defend or capture it. The sheer carnage for control of Mamayev Kurgen raged until January 26, 1943. The hill's height fell from 102ft down to 98ft. Nothing would grow on the hill until spring of 1944.",
	48.742295,
	44.537050
    ],
    [
	"Grain Elevator",
	"The tallest building before and after the bombing campaign of Stalingrad. The Red Army had neglected to use the building as a defensive position. It wasn't until Soviet Marines occupied the building did the Wehrmacht come under fire from the green fortress.",
	48.687818,
	44.483573
    ],
    [
	"Spartanovka",
	"",
	48.8183777,
	44.6062698
    ]
]

console.log(cityData.length);

// Access google maps api, initialize var mapdata
function initMap() {

    infowindow = new google.maps.InfoWindow();
    mapdata = new google.maps.Map(document.getElementById('map'), {
	center: defaultPos,
	zoom: 12,
	mapTypeId: 'satellite'
    });

    // On start initialize city markers
    setCityMarkers();
    // populate yor box/field with lat, lng
    getclickPos();
}

// pass json
function setCityMarkers() {

    for (var i = 0; i < cityData.length; i++) {
	marker = new google.maps.Marker({
	    position: new google.maps.LatLng(cityData[i][2], cityData[i][3]),
	    map: mapdata
	});
	cityMarkers.push(marker);
	google.maps.event.addListener(marker, 'click', (function(marker, i) {
	    return function() {
		infowindow.setContent(cityData[i][0]);
		infowindow.open(map, marker);
	    }
	})(marker, i ));
    }
    //console.log(cityJson); // this will show the info it in firebug console
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

function getclickPos() {
    google.maps.event.addListener(mapdata, 'click', function(event) {
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
	mapdata.setCenter(new google.maps.LatLng(lat, lng));
	console.log(mapdata.getZoom());
	console.log(lat + " " + lng);  // in event.latLng  you have the coordinates of click
    });
}

window.onclick = function(event) {
    if(	!event.target.matches(".button") &&
	!event.target.matches(".sidenav") &&
	!event.target.matches("p") &&
	!event.target.matches(".toggle-button-sidenav") &&
	!event.target.matches(".nav-button") &&
	document.getElementById("mySidenav").style.width === navWidth) {

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
