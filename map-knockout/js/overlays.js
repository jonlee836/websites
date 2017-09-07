// Control ground overlays and marker overlays
function toggleGroup(type, data, mapWindows, mapMarkers) {

    if (type != 'toggle' && type != 'about'){
	for (var i = 0; i < mapMarkers[type].length; i++) {

	    // I'm assuming marker is a reference here...'
	    var marker = mapMarkers[type][i];

	    if (!marker.getVisible()) {
		marker.setVisible(true);
		marker.setAnimation(google.maps.Animation.DROP);
	    }
	    else {
		marker.setVisible(false);
	    }
	    mapWindows[type][i].close();
	}
    }
}

// about button
function aboutButton(data, event){

    // lets me have about-modal pop up on load
    var aboutBtn = document.getElementById("About");
    var aboutSpan = document.getElementsByClassName("about-close")[0];
    var aboutModal = document.getElementById("aboutId");

    // open on about button click
    aboutBtn.onclick = function(){
	aboutModal.style.display = "block";
    }

    // close on about X button click
    aboutSpan.onclick = function() {
	aboutModal.style.display = "none";
    }

    // close on clicking outside the modal
    window.onclick = function(event){
	if (event.target == aboutModal){
	    aboutModal.style.display = "none";
	}
    }

    if (arguments.length == 2){

	// if state of about is 0 or null
	
	if(!data.active()){
	    aboutModal.style.display = "none";
	}
    }
}

function searchButton(data, event){
    console.log(data,event);
}

// switch between english and russian layout
function toggleLanguage(type) {
    
}

var mapIcons = {
    city: {
        icon: 'images/blueicon_city.png'
    },
    soviet: {
        icon: 'images/icon_redarmy.png'
    },
    wehrmacht: {
        icon: 'images/icon_wehrmacht.png'
    },
};

// create markers for the city, red army, and wehrmacht
function setMarkers(type, info, mapdata, mapWindows, mapMarkers, siteNames, infoHTML) {

    var markPos;
    var centerPos;
    var mapIcon = mapIcons[type] || {};
    
    var imgIcon = {
	scaledSize: new google.maps.Size(30, 30),
	origin: new google.maps.Point(0, 0),
	anchor: new google.maps.Point(15, 35),
	url: mapIcon.icon
    }
    
    for (var currIndex = 0; currIndex < info.length; currIndex++) {
	
	var strTitle = info[currIndex][0];
	var htmlStr = setInfo(currIndex, info, infoHTML);
	
	var markLat = info[currIndex][2];
	var markLng = info[currIndex][3];

	var locStr = new Object();

	locStr.location = strTitle;
	siteNames.push(locStr);
	
	var marker = new google.maps.Marker({
	    position: new google.maps.LatLng(markLat, markLng),
	    size: new google.maps.Size(20,20),
	    title : strTitle,
	    icon: imgIcon,
	    animation: google.maps.Animation.DROP,
	    map: mapdata
	});

	// call snazzy-info-window.js
	var infowindow = new SnazzyInfoWindow({
	    marker: marker,
	    content: htmlStr,
	    openOnMarkerClick: true,
	    panOnOpen: false,
	    closeOnMapClick: true,
	    closeWhenOthersOpen: true
	});

	// onload have the city markers be visible.
	// on mouse click center the screen around the marker.
	google.maps.event.addListener(marker, "click", function () {
            mapdata.setCenter(this.getPosition());

	    // bounce animation on click
	    this.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout((function() {
		this.setAnimation(null);
            }).bind(this), 1400);
	})
	
	if (type != 'city') {
	    marker.setVisible(false);
	}

	// push markers and corresponding info window into arrays for future use
	mapMarkers[type].push(marker);
	mapWindows[type].push(infowindow);
    }
}

// read from html file
function setInfo(currIndex, info, infoHTML) {
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
