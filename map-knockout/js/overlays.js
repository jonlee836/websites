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
		// if (data.active() == 0) turn off all markers and corresponding infowindows
		else{
			for (var i = 0; i < mapMarkers[type].length; i++) {
				mapMarkers[type][i].setVisible(false);
				mapWindows[type][i].close();
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

		var CLIENT_ID = '3GA0C0WY5T0XLTP0ISKQGJPEA2F5L01NM33NUHUF5Q1FDRDD';
		var CLIENT_SECRET = '0XKHLUOIXLP1SIQW05OAKTMGWUFDCXTJOLJLBYNWSU1AKKWS';

		var title = info[currIndex][0];

		var markLat = info[currIndex][2];
		var markLng = info[currIndex][3];

		var radius = 10000;

		var section = "topPicks";
		var query = "landmark";
		var htmlStr = setInfo(currIndex, info, infoHTML);

		var address = "";

		// var url = 'https://api.foursquare.com/v2/venues/explore?v=20170916&ll='
		//		+ markLat + ',' + markLng + '&section=' + section
		//		+ '&intent=&query=' + title + '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

		// var url = 'https://api.foursquare.com/v2/venues/explore?v=20170916&ll='
		// 		+ markLat + ',' + markLng + '&sortByDistance=1' + '&section=' + section + '&intent=nextVenues&query=' + title
		// 		+ '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

		var url = 'https://api.foursquare.com/v2/venues/explore?v=20170916&ll='
			+ markLat + ',' + markLng + '&intent=browse=' + title
			+ '&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET;

		var locStr = new Object();

		locStr.location = title;
		siteNames.push(locStr);

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(markLat, markLng),
			size: new google.maps.Size(20,20),
			title : title,
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

		console.log("length", mapWindows[type].length);
		var mapWindows_Index = mapWindows[type].length -1;

		// Async call to foursquare data, this returns the nearest topPick according to fourSquare.
		
		// setfourSquare(url, title, htmlStr, mapWindows, type, mapWindows_Index);
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
		if (markerHtml[i] == 'MARKUPtitle'){
			markerHtml[i] = info[currIndex][0];
		}
		else if (markerHtml[i] == 'MARKUParticle'){
			markerHtml[i] = info[currIndex][1];
		}
		strHtml = strHtml + markerHtml[i];
	}
	return strHtml;
}


function setfourSquare(url, title, htmlStr, mapWindows, type, index){

	var jsonStr = "";

	var street = "";
	var city = "";
	var country = "";

	// console.log("inside setfourSquare:", type, index);

	var fourSquare = $.getJSON((url), function(data) {

		// jsonStr = data.response.groups[0].items[0].venue.location;
		jsonStr = data.response.groups[0].items[0].venue.location.formattedAddress;

		// jsonStr = JSON.stringify(jsonStr);
		// street = jsonStr.address;
		// city = jsonStr.city;
		// country = jsonStr.country;

		street = jsonStr[0];
		city = jsonStr[1];
		country = jsonStr[2];

		htmlStr = htmlStr.replace("MARKUPcity", city);
		htmlStr = htmlStr.replace("MARKUPstreet", street);
		htmlStr = htmlStr.replace("MARKUPcountry", country);

		mapWindows[type][index].setContent(htmlStr);

		// console.log("     JSON COMPLETE", type, "street", street, "city", city, "country", country, title, index, jsonStr, "data", data.response);

	}).fail(function() {
		// eModal.alert('There was an error occured with the Foursquare API. Please try again later.');
		// console.log('There was an error occured with the Foursquare API. Please try again later.');
	});
}
