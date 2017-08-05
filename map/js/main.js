var mapdata, cityOverlay;

var cityData = cityInfo;
var infowindowData = $.getValues("js/infowindow.html");

var defaultPos = {lat: 48.75686777983242, lng: 44.5469856262207};
var navWidth="200px";

var battlefront = []; // Overlay
var cityMarkers = []; // Regular Markers

// initialize var mapdata
$(function() {
    //mapdata = new google.maps.Map($('.map-canvas')[0], {
    mapdata = new google.maps.Map(document.getElementById('map'), {
	styles: mapStyle,
	center: defaultPos,
	zoom: 10,
	// gestureHandling: 'none',
	// scrollwheel: false,
	// disableDoubleClickZoom: true,
	// zoomControl: false,
	disableDefaultUI: true
    });
    
    google.maps.event.addDomListener(window, 'load');

    // setup overlay
    var cityOverlay = new google.maps.OverlayView();

    var imgbounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(49.005447494058096, 44.894256591796875),
	new google.maps.LatLng(48.53843177405044, 44.33807373046875)
    );
    
    cityOverlay = new google.maps.GroundOverlay('http://i.imgur.com/pyjuLfd.jpg', imgbounds);
    cityOverlay.setMap(mapdata);
    // Set buttons for WW2 map and present day satellite map
    var ctrlDiv = document.createElement('div');
    ctrlDiv.index = 1;
    ctrlDiv.style['padding-top'] = '1px';

    $.getScript("js/mapButtons.js", function() {
    	OverlayCtrl(ctrlDiv, mapdata);
    });

    // push  button divs to the top part of the map
    mapdata.controls[google.maps.ControlPosition.TOP_CENTER].push(ctrlDiv);
    
    // initialize city markers
    setCityMarkers();
    
    // get lat, lng
    getclickPos();

    // Show lat and lng of clicked position
    mapdata.addListener('click', function(e){
	var position = {lat: e.latLng.lat(), lng: e.latLng.lng()}
	console.log(position);
    });

});

function setCityMarkers() {
    for (var currIndex = 0; currIndex < cityData.length; currIndex++) {
	
	var strTitle = cityData[currIndex][0];	
	var infowindow = new google.maps.InfoWindow({
	    maxWidth: 250
	});
	
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(cityData[currIndex][2], cityData[currIndex][3]),
	    map: mapdata,
	    title : strTitle	    
	});
	
	cityMarkers.push(marker);
	google.maps.event.addListener(marker, 'click', (function(marker, currIndex) {
	    return function() {
		var htmlStr = setInfo(currIndex);
		infowindow.setContent(htmlStr);
		infowindow.open(map, marker);
	    }
	})(marker, currIndex));

	// close infowindow when you click outside of it
	google.maps.event.addListener(mapdata, "click", function(event) {
	    infowindow.close();
	});
    }
}

function setInfo(currIndex) {
    var markerHtml = [];
    var strHtml = "";

    // Apparently copy by reference is default when cloning arrays in javascript.
    for (var i = 0; i < infowindowData.length; i++){
	markerHtml[i] = infowindowData[i];
    }

    for (var i = 0; i < markerHtml.length; i++){
	if (markerHtml[i] == 'title'){
	    markerHtml[i] = cityData[currIndex][0];
	}
	else if (markerHtml[i] == 'article'){
	    markerHtml[i] = cityData[currIndex][1];
	}
	strHtml = strHtml + markerHtml[i];
    }
    return strHtml;
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

// recenter map to clicked location
function getclickPos() {
    google.maps.event.addListener(mapdata, 'click', function(event) {
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
//	mapdata.panTo(new google.maps.LatLng(lat, lng));
//	mapdata.setCenter(new google.maps.LatLng(lat, lng));
    });
}

// There has got to be a better way...
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

function setMapCanvas() {
    window.onload = function(){
	console.log("loaded map");
    }
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


// This is how not to do load html. Reason being, you're reading from a local file.
// function infoWin () {
//     var htmlArray = require("htmlArray");
//     var htmlText = htmlArray.readFileSync("../infowindow.html").toString('utf-8');
//     var htmlStr = htmlText.split("\n");
//     console.llog(htmlStr);
// }

// function readTextFile(file)
// {
//     var allText;
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 allText = rawFile.responseText;
//             }
//         }
//     }
//     rawFile.send(null);
//     return allText;
// }
