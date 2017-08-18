// get click position info
function getClickInfo() {

    var infoArray = [];
    google.maps.event.addListener(mapdata, 'click', function(event) {

	var lat = event.latLng.lat();
	var lng = event.latLng.lng();

	var zoom = mapdata.getZoom();
	var scale = 1 << zoom;

	console.log("scale", scale);
	console.log("zoom", zoom);
	console.log("lat/lng", lat, lng);

	//	mapdata.panTo(new google.maps.LatLng(lat, lng));
	
    });
}
