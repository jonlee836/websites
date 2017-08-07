// Control ground overlays and marker overlays

function setCityMarkers(cityMarkers, cityData, mapdata) {
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
