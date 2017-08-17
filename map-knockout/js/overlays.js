// Control ground overlays and marker overlays
function toggleGroup(type) {
    if (type != 'about' && type != 'toggle'){
	for (var i = 0; i < mapMarkers[type].length; i++) {

	    // I'm assuming marker is a reference here...'
	    var marker = mapMarkers[type][i];

	    if (!marker.getVisible()) {
		marker.setVisible(true);
	    } else {
		marker.setVisible(false);
	    }
	    mapWindows[type][i].close();
	}
    }
}

// switch between english and russian layout
function toggleLanguage(type) {
    
}

var mapIcons = {
    city: {
        icon: '../images/blueicon_city.png'
    },
    soviet: {
        icon: '../images/icon_redarmy.png'
    },
    wehrmacht: {
        icon: '../images/icon_wehrmacht.png'
    },
};

// create markers for the city, red army, and wehrmacht
function setMarkers(type, info, mapdata) {

    var mapIcon = mapIcons[type] || {};
    
    var imgIcon = {
	scaledSize: new google.maps.Size(30, 30),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(15, 35),
	url: mapIcon.icon
    }
    
    for (var currIndex = 0; currIndex < info.length; currIndex++) {
	
	var strTitle = info[currIndex][0];
	var htmlStr = setInfo(currIndex, info);
	
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(info[currIndex][2], info[currIndex][3]),
	    size: new google.maps.Size(20,20),
	    map: mapdata,
	    title : strTitle,
	    icon: imgIcon
	});

	// call snazzy-info-window.js
	var infowindow = new SnazzyInfoWindow({
	    marker: marker,
	    content: htmlStr,
	    openOnMarkerClick: true,
	    closeOnMapClick: true,
	    closeWhenOthersOpen: true
	});

	if (type != 'city') {
	    marker.setVisible(false);
	}
	
	// push markers and corresponding info window into arrays for future use
	mapMarkers[type].push(marker);
	mapWindows[type].push(infowindow);
    }
}

// info window appearance
var infoHTML = $.getValues("js/infowindow.html");

// read from html file
function setInfo(currIndex, info) {
    var markerHtml = [];
    var strHtml = "";

    // Apparently copy by reference is default when cloning arrays in javascript.....
    // This creates a new copy of the array and put it into a string.
    // Then it will return the string which is then put into the info window
    for (var i = 0; i < infoHTML.length; i++){
	markerHtml[i] = infoHTML[i];
    }

    for (var i = 0; i < markerHtml.length; i++){
	if (markerHtml[i] == 'title'){
	    markerHtml[i] = info[currIndex][0];
	}
	else if (markerHtml[i] == 'article'){
	    markerHtml[i] = info[currIndex][1];
	}
	strHtml = strHtml + markerHtml[i];
    }
    return strHtml;
}
