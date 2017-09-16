// Control ground overlays and marker overlays
function toggleGroup(type, data, mapWindows, mapMarkers) {

	if (type != 'toggle' && type != 'about'){

		// if (data.active() == 1) turn on all markers that are off
		if (data.active() == 1){
			for (var i = 0; i < mapMarkers[type].length; i++) {
				var marker = mapMarkers[type][i];
				if (!marker.getVisible()){
					marker.setVisible(true);
					marker.setAnimation(google.maps.Animation.DROP);
				}
			}
		}
		// if (data.active() == 0) turn off all markers
		else{
			for (var i = 0; i < mapMarkers[type].length; i++) {
				var marker = mapMarkers[type][i];
				marker.setVisible(false);
			}
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
		icon: 'icons/blueicon_city.png'
	},
	soviet: {
		icon: 'icons/icon_redarmy.png'
	},
	wehrmacht: {
		icon: 'icons/icon_wehrmacht.png'
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
			closeWhenOthersOpen: true,
		});

		// for the udacity project have all the city markers be visible onload.

		// This will show only the city markers onload.

		/* 
		   if (type != 'city'){
		   marker.setVisible(false);
		   }
		*/
		
		// on mouse click center the screen around the marker.
		google.maps.event.addListener(marker, "click", function () {

			mapdata.setCenter(this.getPosition());

			// bounce animation on click
			this.setAnimation(google.maps.Animation.BOUNCE);

			setTimeout((function() {
				this.setAnimation(null);
			}).bind(this), 1400);
		});

		// How to attach an image slider....
		google.maps.event.addListener(infowindow, 'domready', function(){
			console.log("dom loaded");
		});

		// Set city to be visible on load
		// if (type != 'city') {
		// marker.setVisible(false);
		// }

		marker.setVisible(true);
		// push markers and corresponding info window into arrays for future use
		mapMarkers[type].push(marker);
		mapWindows[type].push(infowindow);
	}
}

// read from html file
function setInfo(currIndex, info, infoHTML) {

	var CLIENT_ID = '0V5NAVXIRLYN3O5OYPYKNRYOZFO2PGIFR5NELPVX3YONN334';
	var CLIENT_SECRET = 'VYNNTIJVZYE1X2FHZ32XOOT0AK0QLDBZ53OLUZHXADXOXAAM';

	var title = info[currIndex][0];
	var lat = info[currIndex][2];
	var lng = info[currIndex][3];
	var section = "sights";
	
	var address = "";
	
	var url = 'https://api.foursquare.com/v2/venues/explore?v=20161016&ll='
		+ lat + ',' + lng + '&section=' + section + '&intent=global&query=' + title
		+ '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

	var markerHtml = [];
	var strHtml = "";

	var fourSquare = $.getJSON((url), function(data) {

        address = data.response.groups[0].items[0].venue.location.formattedAddress
		// titleRU = data.name;
		// category = data.categories[0].shortName;
		// checkinsCount = data.stats.checkinsCount;
		// usersCount = data.stats.usersCount;
		// tipCount = data.stats.tipCount;
		console.log("inside $.getJson ", title, currIndex, address);

	}).fail(function() {
		console.log('There was an error occured with the Foursquare API. Please try again later.');
	});
	
	console.log("outside $.getJson ", title, currIndex, address);
	
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
		else if (markerHtml[i] == 'time'){
			markerHtml[i] = address;
		}
		strHtml = strHtml + markerHtml[i];
	}
	return strHtml;
}
