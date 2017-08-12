var mapdata, cityOverlay;

var navWidth="200px";
var defaultPos = {
    lat: 48.75686777983242,
    lng: 44.52157974243164
};

// Map mapMarkers to click on.
var mapMarkers = {
    city: [],
    soviet: [],
    wehrmacht: []
};

var mapWindows = {
    city: [],
    soviet: [],
    wehrmacht: []
}

var toggle = [false, false, false, false, true];
var endIndex = toggle.length - 1;

// WW2 Stalingrad map overlay that appears when you click the 'Stalingrad' button.
var battlefront = []; // Overlay

// onload initialize map data and UI elements
$(function() {

    mapdata = new google.maps.Map(document.getElementById('map'), {
	styles: mapStyle,	
	center: defaultPos,
	zoom: 12,
	gestureHandling: 'gestures',
	disableDefaultUI: false
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

    // create DOM element inside google maps
    // set buttons for WW2 map and present day satellite map
    var ctrlDiv = document.createElement('div');
    ctrlDiv.index = 1;
    ctrlDiv.style['padding-top'] = '1px';
    $.getScript("js/mapButtons.js", function() {
    	OverlayCtrl(ctrlDiv, mapdata);
    });
    mapdata.controls[google.maps.ControlPosition.TOP_LEFT].push(ctrlDiv);

    // need region detection to determine whether or not to load it in english or russian
    // local variables makes code more readable vs accessing global variables
    // or.... you could just access everything global by key

    // Does JS not care about an incorrect number of arguments being passed into a function??!?!?
    var cityInfo = infoData['city'];
    var sovietInfo = infoData['soviet'];
    var wehrmachtData = infoData['wehrmacht'];
    
    // set mapMarkers
    $.getScript("js/overlays.js", function() {
	setMarkers('city', cityInfo, mapdata);
	setMarkers('soviet', sovietInfo, mapdata);
    });

    // get lat, lng
    getclickPos();
});

// open navigation on nav button click
function openNav() {
    // if it is open close it, the window.onclick stuff is so it doesn't close when you click inside the navbar
    if(document.getElementById("mySidenav").style.width == navWidth){
	closeNav();
    }
    // if it's not open, open it
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
	console.log(lat, lng);
	//	mapdata.panTo(new google.maps.LatLng(lat, lng));
	//	mapdata.setCenter(new google.maps.LatLng(lat, lng));
    });
}

// toggle button click
function toggleClick(e){

    var str = getButtonStr(e);
    var strId = toTitleCase(str);
    
    var colorOn  = hexToRgb("#ffffff");
    var colorOff = hexToRgb("#818181");

    switch(str.toUpperCase()){
	
    case "The City".toUpperCase():
	toggle[0] = !toggle[0];
	break;
    case "Red Army".toUpperCase():
	toggle[1] = !toggle[1];
	break;
    case "Wehrmacht".toUpperCase():
	toggle[2] = !toggle[2];
	break;
    case "About".toUpperCase():
	toggle[3] = !toggle[3];
	break;
    case "Toggle Menu".toUpperCase():
	toggle[endIndex] = !toggle[endIndex];
	break;
    }

    var cc = document.getElementById(strId).style.color;
    if (cc != colorOn){
	document.getElementById(strId).style.color = colorOn;
	console.log("Highlighting ON");
    }
    else {
	document.getElementById(strId).style.color = colorOff;
	console.log("Highlighting OFF");
    }
}

// get the type of Obj
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// hex color  converter
function hexToRgb(hex, alpha) {
    hex   = hex.replace('#', '');
    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
    if ( alpha ) {
	return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
    }
    else {
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }
}

// only capitalize the first letter of each word.
function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}


// get the text of the button
function getButtonStr (e) {
    var str = "";

    if (e.target.matches("nav-button")){
	str = e.target.firstElementChild.innerHTML;
    }
    else{
	str = e.target.innerText;
    }

    return str;
}

// There has got to be a better way...
window.onclick = function(event) {    
    // if toggleCondition is true don't hide navbar when you click outside it
    if (event.target.matches("button.nav-button") ||
	event.target.matches("p")
       ){
	toggleClick(event);
    }
    else if (toggle[endIndex]){
	
	// check if click is outside the nav bar
	if(!event.target.matches(".button") &&
	   !event.target.matches(".sidenav") &&
	   !event.target.matches("p") &&
	   !event.target.matches(".toggle-button-sidenav") &&
	   !event.target.matches(".nav-button") &&
	   document.getElementById("mySidenav").style.width === navWidth
	  ){
	    closeNav();
	}
    }
}
