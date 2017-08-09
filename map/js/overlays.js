// Control ground overlays and marker overlays
function toggleGroup(type) {
    for (var i = 0; i < markerGroups[type].length; i++) {
	var marker = markerGroups[type][i];
	if (!marker.getVisible()) {
	    marker.setVisible(true);
	} else {
	    marker.setVisible(false);
	}
    }
}

var customIcons = {
    blue: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
    },
    white: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/white.png'
    },
    green: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'
    },
    red: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
    }
};

function setMarkers(markerType, cityMarkers, cityWindowInfo, mapdata) {
    
    for (var currIndex = 0; currIndex < cityWindowInfo.length; currIndex++) {
	
	var strTitle = cityWindowInfo[currIndex][0];	

	var infowindow = new google.maps.InfoWindow({
	    maxWidth: 250
	});
	
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(cityWindowInfo[currIndex][2], cityWindowInfo[currIndex][3]),
	    map: mapdata,
	    title : strTitle	    
	});

	// Immediately display markers
	markers[markerType].push(marker);

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
	    markerHtml[i] = cityWindowInfo[currIndex][0];
	}
	else if (markerHtml[i] == 'article'){
	    markerHtml[i] = cityWindowInfo[currIndex][1];
	}
	strHtml = strHtml + markerHtml[i];
    }
    return strHtml;
}
