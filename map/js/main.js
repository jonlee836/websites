var mapdata;

var cityData = cityInfo;
var infowindowData = $.getValues("js/infowindow.html");

var defaultPos = {lat: 48.75618876280552, lng: 44.5246696472168};
var navWidth="200px";

var battlefront = []; // Overlay
var cityMarkers = []; // Regular Markers

// Access google maps api, initialize var mapdata
$(function() {
    //mapdata = new google.maps.Map($('.map-canvas')[0], {
    mapdata = new google.maps.Map(document.getElementById('map'), {
	styles: mapStyle,
	center: defaultPos,
	zoom: 11,

	mapTypeControl: true,
	mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
	},
	// If mapTypeId is set it will negate styles
	// mapTypeId: 'satellite'
    });

    // Show lat and lng of clicked position
    mapdata.addListener('click', function(e){
	var position = {lat: e.latLng.lat(), lng: e.latLng.lng()}
	console.log(position);
    });
    
    // show address of clicked location
    // var geocoder = new google.maps.Geocoder();
    // google.maps.event.addListener(mapdata, 'click', function(event) {
    // 	geocoder.geocode({
    // 	    'latLng': event.latLng
    // 	}, function(results, status) {

    // 	    if (status == google.maps.GeocoderStatus.OK) {
    // 		for (var i = 0; i < results.length; i++){
    // 		    console.log(results[i].formatted_address);
    // 		}
    // 	    }
    // 	});
    // });

    // On start initialize city markers
    setCityMarkers();

    // populate yor box/field with lat, lng
    getclickPos();
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

function getclickPos() {
    google.maps.event.addListener(mapdata, 'click', function(event) {
	var lat = event.latLng.lat();
	var lng = event.latLng.lng();
	mapdata.setCenter(new google.maps.LatLng(lat, lng));
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
