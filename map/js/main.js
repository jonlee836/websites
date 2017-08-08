var mapdata, cityOverlay;

var cityData = cityInfo;

var infowindowData = $.getValues("js/infowindow.html");
var navWidth="200px";
var defaultPos = {
    lat: 48.75686777983242,
    lng: 44.5469856262207
};

var toggle = [true, false, false, false, true];
var battlefront = []; // Overlay
var cityMarkers = []; // Regular Markers
var cityStatus  = [];

var endIndex = toggle.length - 1;

// onload initialize map data and UI elements
$(function() {

    cityStatus = new Array(cityData.length);
    
    for (var i = 0; i < cityStatus.length; i++){
	cityStatus[i] = false;
    }
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
    $.getScript("js/overlays.js", function() {
	setCityMarkers(cityMarkers, cityData, mapdata);
    });
    
    // initialize city markers
    
    //setCityMarkers();
    
    // get lat, lng
    getclickPos();

    // Show lat and lng of clicked position
    mapdata.addListener('click', function(e){
	var position = {lat: e.latLng.lat(), lng: e.latLng.lng()}
	console.log(position);
    });

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

    //var colorOn  = "#ffffff";
    //var colorOff = "#818181";

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
	console.log("before" ,toggle[endIndex]);
	toggle[endIndex] = !toggle[endIndex];
	console.log("after", toggle[endIndex]);
	break;
    }

    console.log("before fail",e);
    
    var f = document.getElementById(strId), style = window.getComputedStyle(f), top = style.getPropertyValue('color');
    var x = document.getElementsByTagName("STYLE");
    var cc = document.getElementById(strId).style.color;

    console.log("div = ", strId, "top ", top, "style", x,
		"colorOn ", colorOn,
		"colorOff ", colorOff, " current color ", cc);

    // The fail loop of wasting time.
    // Ask yourself, what point is there in looping through the array on click?
    
    // for (var i = 0; i < toggle.length; i++){
    // 	if (toggle[i]){
    // 	    document.getElementById(strId).style.color = colorOn;
    // 	}
    // 	else if (!toggle[i]){
    // 	    document.getElementById(strId).style.color = colorOff;
    // 	}
    // }    

    // The working if statement
    if (cc != colorOn){
	document.getElementById(strId).style.color = colorOn;
	console.log("Highlighting ON");
    }
    else {
	document.getElementById(strId).style.color = colorOff;
	console.log("Highlighting OFF");
    }

}

// Get the type of Obj
var toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

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

// Only apitalize the first letter of each word.
function toTitleCase(str)
{
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
