var mapdata, cityOverlay;

var cityData = cityInfo;
var infowindowData = $.getValues("js/infowindow.html");

var defaultPos = {lat: 48.75686777983242, lng: 44.5469856262207};
var navWidth="200px";

var toggle = new Array(5);
var battlefront = []; // Overlay
var cityMarkers = []; // Regular Markers

var endIndex = toggle.length - 1;
// initialize var mapdata
$(function() {

    for (var i = 0; i < toggle.length; i++) {toggle[i] = false;}
    
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
function toggleClick(str){

    switch(str)
    {
	case "The City":    toggle[0] = !toggle[0];
	case "Red Army":    toggle[1] = !toggle[1];
	case "Wehrmacht":   toggle[2] = !toggle[2];
	case "Toggle Menu": toggle[endIndex] = !toggle[endIndex];
    }
    console.log(str);
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
    console.log(event);
    if (event.target.matches("button.nav-button") ||
	event.target.matches("p")
       ){
	console.log("match");

	var htmlStr = getButtonStr(event);
	toggleClick(htmlStr);
    }
    else if (toggle[endIndex]){
	
	// check if click is outside the nav bar
	if(!event.target.matches(".button") &&
	   !event.target.matches(".sidenav") &&
	   !event.target.matches("p") &&
	   !event.target.matches(".toggle-button-sidenav") &&
	   !event.target.matches(".nav-button") &&
	   document.getElementById("mySidenav").style.width === navWidth &&
	   toggleCondition != false
	  ){
	    console.log(toggleCondition);
	    closeNav();
	    
	}
    }  
    $('#mySidenav').on('click', 'a', function() {
	console.log($(this).index());
    });
}

window.onload = function(){

}
