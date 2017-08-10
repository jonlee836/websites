// Control ground overlays and marker overlays
function toggleGroup(type) {
    for (var i = 0; i < markers[type].length; i++) {
	var marker = markers[type][i];
	if (!marker.getVisible()) {
	    marker.setVisible(true);
	} else {
	    marker.setVisible(false);
	}
	infowindows[type][i].close();
    }
}

var mapIcons = {
    city: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue.png'
    },
    soviet: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/red.png'
    },
    wehrmacht: {
        icon: 'http://maps.google.com/mapfiles/ms/icons/green.png'
    },
};

function setMarkers(markerType, cityMarkers, cityWindowInfo, mapdata) {

    var mapIcon = mapIcons[markerType] || {};
    
    for (var currIndex = 0; currIndex < cityWindowInfo.length; currIndex++) {
	
	var strTitle = cityWindowInfo[currIndex][0];	
	var htmlStr = setInfo(currIndex);
//	var infowindow = new google.maps.InfoWindow({
//	    maxWidth: 250
//	});

	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(cityWindowInfo[currIndex][2], cityWindowInfo[currIndex][3]),
	    map: mapdata,
	    title : strTitle,
	    icon: mapIcon.icon
	});

	var infowindow = new SnazzyInfoWindow({
	    marker: marker,
	    content: htmlStr,
	    openOnMarkerClick: true,
	    closeOnMapClick: true,
	    closeWhenOthersOpen: true
	});
	
	// having htmlStr outside of google maps.event and settings the content inside
	// "var infowindow using content: htmlStr"
	// sets the marker info as cityWindowInfo[lastIndex] for all of them, why is this?

	// google.maps.event.addListener(marker, 'click', (function(marker, currIndex) {
	//     return function() {
	// 	var htmlStr = setInfo(currIndex);
	// 	infowindow.setContent(htmlStr);
	// 	infowindow.open(map, marker);
	//     }
	// })(marker, currIndex));

	// close infowindow when you click outside of it
//	google.maps.event.addListener(mapdata, "click", function(event) {

	    // interesting.... the infowindow appears to be a seperate DOM object since
	    // google maps cannot detect a click on the info window itself.
//	    infowindow.close();
//	});

	// push markers and corresponding info window into arrays for future use
	markers[markerType].push(marker);
	infowindows[markerType].push(infowindow);
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
